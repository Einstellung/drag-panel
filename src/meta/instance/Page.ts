import { Emiter } from "../../utils";
import { ComponentMeta } from "../meta/ComponentMeta";
import { NodeType } from "../standard.types";
import { Topic } from "../Topic";
import { Node } from "./Node";

export class Page extends Emiter<Topic> {
  private id_base: number
  // private root: NodeType

  constructor() {
    super()
    this.id_base = 1
    // this.root = new Node()
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

  // getRoot() {
  //   return this.root
  // }
}