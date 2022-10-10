import { Node } from "./instance/Node";
import { CodeEventType } from "./runtime.types";
import { UIComponentRenderOptions } from "./standard.types";
import { Topic } from "./Topic";

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

  setPropValue(path: string[], value: any) {
    this.node.setPassPropValue(path, value)
    this.node.emit(Topic.NodePropUpdated)
  }

  // 目前传递的是node而不是CodeNodeProxy，这会导致泄露
  notify(eventType: CodeEventType) {
    this.node.emit(Topic.ExternalEventNotify, {
      type: eventType,
      node: this.node,
    })
  }

  // 提供node响应能力
  on(topic: Topic | Topic[]) {
    return this.getNode().on(topic)
  }

  getTmpData() {
    return this.node.getMemory()
  }
}