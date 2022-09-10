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
  private pageNode: NodeType

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