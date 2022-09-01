import { Emiter } from "../../utils";
import { BoxDescriptor } from "../BoxDescriptpr";
import { ComponentMeta } from "../meta/ComponentMeta";
import { NodeData } from "../standard.types";
import { Topic } from "../Topic";

class InstanceData extends Emiter<Topic> {
  protected data: NodeData
  constructor(data: NodeData) {
    super()
    this.data = data
  }

  public getData() {
    return this.data
  }

  public getBox(): BoxDescriptor {
    return this.data.get("box")
  }
}

export class Node extends InstanceData {
  meta: ComponentMeta
  constructor(meta: ComponentMeta, data: NodeData) {
    super(data)
    this.meta = meta
  }

}
