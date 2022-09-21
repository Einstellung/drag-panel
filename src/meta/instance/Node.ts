import { Emiter } from "../../utils";
import { Rect } from "./Rect";
import { BoxDescriptor } from "../BoxDescriptpr";
import { ComponentMeta } from "../meta/ComponentMeta";
import { NodeData } from "../standard.types";
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

  // isContainer() {
  //   return this.getBox().container
  // }

  // getMountPointRect(): Rect {
  //   if (!this.mountPoint) {
  //     return Rect.ZERO
  //   }
  //   return this.mountPoint.getDiffRect()
  // }

  // getMountPoint() {
  //   return this.mountPoint
  // }

  // /** todo!! */
  // getChildren() {
  //   const children: Array<Node> = this.data.get("children").concat()
  //   return children
  // }

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

  setChildren(children: Array<Node>) {
    this.data.set("children", children)
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
   * 将当前节点相对挂载点的位置添加进当前节点
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

  // addToRelative(node: Node, position?: [number, number]) {
  //   if(!position) {
  //     position = [node.getBox().left.toNumber(), node.getBox().top.toNumber()]
  //   }

  //   this.addParent(node)
  //   node.setXY(...position)
  //   this.addSortChildren(node)
  // }

  // /** 对子元素按规则排序并添加到节点中 */
  // private addSortChildren(node: Node) {
  //   this.updateInstanceData("children", (_children) => {
  //     let children = _children as Array<Node>
  //     children = children.concat(node)
  //     return children
  //   })
  // }

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
}
