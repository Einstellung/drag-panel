import { ComponentsLoader } from "../../loader";
import { Emiter } from "../../utils";
import { BoxDescriptor } from "../BoxDescriptpr";
import { ComponentMeta } from "../meta/ComponentMeta";
import { JsonNode, JsonPage, NodeData, NodeType } from "../standard.types";
import { Topic } from "../Topic";
import { Node } from "./Node";

export class Page extends Emiter<Topic> {
  private id_base: number
  private loader: ComponentsLoader
  private root: NodeType
  pageNode: NodeType

  constructor(json: JsonPage, loader: ComponentsLoader) {
    super()
    this.id_base = 1
    this.loader = loader
    const meta = this.loader.loadByName("container", "root")
    const rootBox = new BoxDescriptor({
      left: 0,
      top: 0,
      width: 3200,
      height: 3200
    }, meta)
    this.root = new Node(meta, meta.createData(this.createId(), rootBox))

    const pageNode = this.fromJson(json.page)
    pageNode.setAllowDrag(false)
    this.root.addToAbsolute(pageNode)
    this.pageNode = pageNode

    // @ts-ignore
    window.page = this.pageNode
    // @ts-ignore
    window.root = this.root
  }

  private createId(){
    return this.id_base++
  }

  /**
   * 通过json创建完整的渲染树
   * @param json 
   */
  private fromJson(json: JsonNode) {

    const meta = this.loader.loadByName(json.group, json.name)
    const box = new BoxDescriptor(json.box, meta)

    const id = json.id || this.createId()
    let node: Node

    // 有json.id表示是preview渲染，要从json中创建node
    if(json.id) {
      const instanceData = meta.createDataFromJson(json)
      node = new Node(meta, instanceData)

      if(json.children) {
        const childNode = json.children.map(child => {
          const childNode = this.fromJson(child)
          return childNode
        })
        node.setChildren(childNode)
      }

    } else {
      const instanceData = meta.createData(id, box)
      node = new Node(meta, instanceData as NodeData)
    }

    return node
  }

  /**
   * 根据meta数据创建实例节点node
   * @param meta
   */
  createFromMetaNew(meta: ComponentMeta) {
    const box = meta.box.clone()
    const id = this.createId()
    const nodeData = meta.createData(id, box)
    const node = new Node(meta, nodeData)
    return node
  }

  getRoot() {
    return this.root
  }
}