import { Emiter } from "@drag/utils";
import { Rect } from "./Rect";
import { BoxDescriptor } from "../BoxDescriptpr";
import { ComponentMeta } from "../meta/ComponentMeta";
import { JsonNode, NodeData, NodeInstanceJsonStructure } from "../standard.types";
import { Topic } from "../Topic";
import { MountPoint } from "./MountPoint";
import { Map as ImmutableMap } from "immutable"
import { CordNew } from "./Cord.new";
import { PropMeta } from "../meta/PropMeta";

export class Node extends Emiter<Topic> {
  meta: ComponentMeta
  private mountPoint?: MountPoint
  private data: NodeData
  /** node层级关系 */
  level = 0
  /** 用于缓存临时数据，目前用在codeless中传递data文本信息 */
  private tmpData: any
  constructor(meta: ComponentMeta, data: NodeData) {
    super()
    this.meta = meta
    this.data = data
  }

  getId() {
    return this.data.get("id")
  }

  getData() {
    return this.data
  }

  getName() {
    return this.data.get("name")
  }

  getBox(): BoxDescriptor {
    return this.data.get("box")
  }

  getGroup() {
    return this.data.get("group")
  }

  getParent(): Node {
    return this.data.get("parent")
  }

  getPassProps(): ImmutableMap<string, any> {
    return this.data.get("passProps")
  }

  getStyleObj() {
    return this.data.get("style").toJS()
  }

  isDraggable() {
    const name = this.getName()
    return this.getBox().movable && name !== "root" && name !== "page"
  }

  isContainer() {
    return this.getBox().container
  }

  getMountPointRect(): Rect {
    if (!this.mountPoint) {
      return Rect.ZERO
    }
    return this.mountPoint.getDiffRect()
  }

  getMountPoint() {
    return this.mountPoint
  }

  /** 待注释,供bridge使用 */
  getChildren() {
    const children: Array<Node> = this.data.get("children").concat()
    const box = this.getBox()
    if(box.display === "flex" && box.flexDirection === "row") {
      children.sort((a, b) => a.absMountPointRect().left - b.absMountPointRect().left)
    }
    if(box.display === "flex" && box.flexDirection === "column") {
      children.sort((a, b) => a.absMountPointRect().top - b.absMountPointRect().top)
    }
    return children
  }

  setParent(node: Node | null) {
    if (node !== null) this.level = node.level + 1
    this.setInstanceData("parent", node)
  }

  setXY(x: number, y: number) {
    this.getBox().left.set(x)
    this.getBox().top.set(y)
  }

  setXYWH(x: number, y: number, w: number, h: number) {
    const box = this.getBox()
    box.left.set(x)
    box.top.set(y)
    box.width.set(w)
    box.height.set(h)
  }

  /**
   * vec情况下更正对挂载点偏移值
   * @param vec 拖拽后对start偏移值
   */
  setXYByVec(vec: [number, number]) {
    const box = this.getBox()
    const x = box.left.toNumber()
    const y = box.top.toNumber()

    this.setXY(x + vec[0], y + vec[1])
  }

  /** 需要写成setInstance而不能是直接set，难道是通过赋值的办法重新更新一下数据？
   * 将来要好好学一下Immutable，直接写set会赋值出错，得到的不是node实例数据而是NodeData原始数据
   */
  setChildren(children: Array<Node>) {
    // this.data.set("children", children)
    this.setInstanceData("children", children)
  }

  setInstanceData(key: string, value: any) {
    this.data = this.data.set(key, value)
  }

  setPassPropValue(path: string[], value: any) {
    const passProps = this.getPassProps().setIn(path, value)
    this.setInstanceData("passProps", passProps)
  }

  setAllowDrag(allowDrag: boolean) {
    this.setInstanceData("allowDrag", allowDrag)
  }

  setMount(ele: HTMLElement, cord: CordNew) {
    this.mountPoint = new MountPoint(ele, this, cord)
  }

  updateInstanceData(key: string, updator: (value: any) => void) {
    this.data = this.data.updateIn([key], updator)
  }

  /** 根据path更新实例数据 */
  updateInstanceByPath(path: string[], value: any) {
    this.data = PropMeta.setPropValue(path, this.data, value)
    this.emit(Topic.NodePropUpdated)
  }

  /** 
   * 将当前节点相对挂载点的位置添加进当前节点;
   * 将传入的node节点挂载父节点
   * @param position 当前节点的[worldX, worldY]
   */
  addToAbsolute(node: Node, position?: [number, number]) {
    if (!position) {
      position = [node.getBox().left.toNumber(), node.getBox().top.toNumber()]
    }
    this.addParent(node)
    const [x, y] = position
    const [sx, sy] = this.absPosition()
    node.setXY(x - sx, y - sy)
    this.addSortChildren(node)
  }

  addToRelative(node: Node, position?: [number, number]) {
    if (!position) {
      position = [node.getBox().left.toNumber(), node.getBox().top.toNumber()]
    }

    this.addParent(node)
    node.setXY(...position)
    this.addSortChildren(node)
  }

  /** 对子元素按规则排序并添加到节点中 */
  addSortChildren(node: Node) {
    this.updateInstanceData("children", (_children) => {
      let children = _children as Array<Node>
      children = children.concat(node)
      return children
    })
  }

  /**
   * 将node节点的父节点指向this节点
   */
  private addParent = (node: Node) => {
    if (node === this) {
      throw new Error("Cannot add node to itself")
    }
    if (node.getParent() === this) {
      return
    }

    console.info("[add node]", node.getName(), "to", this.getName())

    // 移除旧的节点，更新父节点
    if (node.getParent()) {
      const p = node.getParent()
      p.remove(node)
    }
    node.setParent(this)
  }

  private remove(node: Node) {
    this.updateInstanceData(
      "children",
      (children: Array<Node>) => {
        return children.filter(x => x !== node)
      }
    )
  }

  /** 当前节点挂载点的[worldX, worldY] */
  absPosition(): Array<number> {
    if (this.mountPoint) {
      return this.mountPoint.getAbsPosition()
    }

    const parent = this.getParent()
    const rect = this.getMountPointRect()
    if (!parent) {
      return [rect.left, rect.top]
    }

    const [x, y] = parent.absPosition()
    return [x + rect.left, y + rect.top]
  }

  /**
   * 返回挂载点[worldX, worldY, width, height]
   */
  absMountPointRect() {
    const rect = this.getMountPointRect()
    const [x, y] = this.absPosition()
    return new Rect(x, y, rect.width, rect.height)
  }

  /** (x,y) 坐标是否在rect盒子里面 */
  bound(x: number, y: number) {
    if (!this.getParent()) {
      return true
    }
    return this.getMountPointRect().bound(x, y)
  }

  toJSON() {
    const data = this.getData().remove("parent")
    const json: Partial<NodeInstanceJsonStructure> = data.toJS()
    const newJson = {...json, box: json.box?.toJSON()}
    newJson.children = this.getChildren().map(child => child.toJSON())
    return newJson as JsonNode
  }

  *bfs(): Generator<Node> {
    const queue: Array<Node> = [this]
    let limit = 1000

    while(queue.length > 0 && limit-- > 0) {
      const node = queue.shift()
      if(!node) {
        continue
      }

      yield node

      for (let child of node.getChildren()) {
        queue.push(child)
      }
    }

    if(limit === -1) {
      throw new Error("limit exceed")
    }
  }

  // codeless缓存数据
  setMemory(data: any) {
    this.tmpData = data
    this.emit(Topic.MemorizedDataChanged)
  }

  getMemory() {
    return this.tmpData
  }
}
