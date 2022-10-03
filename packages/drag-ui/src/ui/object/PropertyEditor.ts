import { GroupMeta, Node, Topic } from "@drag/meta";
import { Emiter } from "@drag/utils";
import { PropItem } from "./PropItem";
import { UIModel } from "./UIModel";

export class PropertyEditor extends Emiter<Topic> {

  groups: Array<GroupMeta>
  itemProps: {[name: string]: PropItem}

  constructor(editor: UIModel) {
    super()
    this.groups = []
    this.itemProps = {}

    editor.on(Topic.SelectionChanged)
      .subscribe(() => {
        this.handleSelectChange(editor.selection!)
        this.emit(Topic.PropertyModelUpdated)
        this.updateProps()
      })

    editor.on([Topic.Resized, Topic.NodeMoved])
      .subscribe(() => {
        console.log("[Topic.Resized, Topic.NodeMoved] update property")
        this.updateProps()
      })
  }

  /** 重新给this.groups和this.itemProps赋值 */
  private addNode(node: Node) {
    const meta = node.meta

    // 合并分组（实际上暂时不支持选择多个节点，if没有价值）
    for(let group of meta.propertyGroups) {
      const sameGroup = this.groups.find(x => x.name === group.name)
      if(sameGroup) {
        sameGroup.mergeGroup(group)
      } else {
        // 万一将来会有多个propertyEditor或者什么其他实例，元数据的方法不应被污染，所以clone
        this.groups.push(group.clone())
      }
    }

    // 合并属性清单（实际上暂时不支持选择多个节点，if没有价值）
    for (let key in meta.itemProps) {
      const prop = meta.itemProps[key]
      if(this.itemProps[key]) {
        this.itemProps[key].merge(prop, node)
      } else {
        this.itemProps[key] = new PropItem(prop, node)
      }
    }
  }

  private updateProps() {
    Object.values(this.itemProps).forEach(prop => {
      prop.update()
    })
  }


  private handleSelectChange(selection: Node) {
    this.groups = []
    this.itemProps = {}
    this.addNode(selection)
  }
}