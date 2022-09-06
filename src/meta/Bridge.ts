import { Node } from "./instance/Node";
import { UIComponentRenderOptions } from "./standard.types";

type BridgeNode = "editor" | "render"

export class Bridge {

  /** 连接外部render组件能力 */
  public renderForReact?: (
    node: Node,
    options: UIComponentRenderOptions
  ) => any
  
  constructor(
    private node: Node,
    private mode: BridgeNode = "editor"
  ) {
  }

  getNode() {
    return this.node
  }

  render(node: Node, options: UIComponentRenderOptions) {
    return this.renderForReact!(node, options)
  }
}