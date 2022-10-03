import { GroupConfig } from "./ComponentMeta"

export class GroupMeta {
  name: string
  title:string
  style: any
  propKeys: Set<string>
  disabled?: boolean

  constructor() {
    this.name = ""
    this.title = ""
    this.style = {}
    this.propKeys = new Set<string>()
  }

  /** 创建实例对象，添加itemProps.name */
  static of(config: GroupConfig) {
    const group = new GroupMeta()
    group.name = config.name
    group.title = config.title
    group.disabled = config.disabled
    group.style = config.style
    if(config.props) {
      config.props.forEach(prop => {
        if(prop.name) {
          group.propKeys.add(prop.name)
        }
      })
    }
    return group
  }

  /** 暂时没有实际用到 */
  mergeGroup(group: GroupMeta) {
    const mergeG = new GroupMeta()
    mergeG.propKeys = new Set([...this.propKeys])
    group.propKeys.forEach(key => {
      mergeG.propKeys.add(key)
    })

    return mergeG
  }

  clone() {
    const cloneG = new GroupMeta()
    cloneG.name = this.name
    cloneG.title = this.title
    cloneG.style = this.style
    cloneG.disabled = this.disabled
    cloneG.propKeys = new Set([...this.propKeys])
    return cloneG
  }
}