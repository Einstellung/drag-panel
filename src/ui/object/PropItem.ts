import { Node, PropMeta, Topic } from "../../meta";
import { Emiter } from "../../utils";

export class PropItem extends Emiter<Topic> {
  
  meta: PropMeta
  node: Node
  disabled: boolean
  itemValue: any

  constructor(meta: PropMeta, node: Node) {
    super()
    this.meta = meta
    this.node = node
    this.disabled = meta.disabled || false
    this.itemValue = PropMeta.getPropValue(meta.path, node.getData())
  }

  update() {
    if(this.disabled) return

    if(this.node) {
      this.itemValue = PropMeta.getPropValue(
        this.meta.path,
        this.node.getData()
      )

      if(this.itemValue && this.itemValue.toJS) {
        this.itemValue = this.itemValue.toJS()
      }
      this.emit(Topic.PropertyChanged)
    }
  }

  /** 没有实现同时选择多个节点，此方法暂时无效 */
  merge(prop: PropMeta, node: Node) {
    const value = PropMeta.getPropValue(prop.path, node.getData())
    if(value !== this.itemValue) {
      this.disabled = true
    }
    this.node = node
  }

  /** 更新实例节点元数据信息 */
  set(value: any) {
    this.node.updateInstanceByPath(this.meta.path, value)
    this.emit(Topic.PropertyChanged)
  }
}