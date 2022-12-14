import { BoxDescriptor } from "../BoxDescriptpr"
import { BoxDescriptorInput, JsonNode } from "../standard.types"
import { fromJS, Map as ImmutableMap } from "immutable"
import { GroupMeta } from "./GroupMeta"
import { PropMeta } from "./PropMeta"

export interface PropConfig {
  name : string,
  props? : any, // 属性描述信息，如style, suffix等
  type : string,
  disabled? : boolean
  default? : any
  label? : string
  selections ? : any
  path : string, // 属性作用的位置，比如box.width
  row ? : number, 
  children? : Array<PropConfig>,
  rowLabel? : string
}

export interface GroupConfig {
  name: string,
  title: string,
  props?: Array<PropConfig>
  disabled?: boolean,
  style?: any, 
}

export interface PropsEditorConfigure {
  groups?: Array<GroupConfig>
}

export interface ComponentMetaConfig {
  // 组件名称 
  name : string,

  // 分组
  group : string,

  // logo图片
  imageUrl : string,

  // 标题
  title : string,

  // 盒子模型
  box : BoxDescriptorInput,

  // 属性编辑器属性
  editor : PropsEditorConfigure,

  // description : string,

  // 是否为内部组件
  intrinsic? :  boolean,

  // 初始样式
  style? : any,

  author : string,

  // 传递给组件的初始属性
  defaultProps : any,

  /** External component */
  componentType: "react" | "vue",
  sourceFileSrc: string, // source file location, 如.\src\Swiper.tsx
  buildFileSrc: string, // 打包编译好的文件位置，用于做打包校验
  url?: string, // 用于区分是内部还是外部组件如local.button
  yml: string,
  version: string
}

export class ComponentMeta {
  name: string
  group: string
  imageUrl : string
  title : string
  box : BoxDescriptor
  editor: PropsEditorConfigure
  intrinsic? :  boolean
  url? : string
  style? : any
  defaultProps: any
  propertyGroups: Array<GroupMeta>
  itemProps: {[name: string]: PropMeta} // propItem元数据

  constructor(config: ComponentMetaConfig) {
    this.name = config.name
    this.group = config.group
    this.imageUrl = config.imageUrl
    this.title = config.title
    this.intrinsic = config.intrinsic
    this.url = config.url
    this.style = config.style
    this.defaultProps = config.defaultProps
    this.box = new BoxDescriptor(config.box)
    this.editor = config.editor
    this.propertyGroups = []
    this.itemProps = {}

    // 把属性编辑器中的元数据通过实例对象方式赋予其他能力
    if(config.editor && config.editor.groups) {
      for (let group of config.editor.groups) {
        this.propertyGroups.push(GroupMeta.of(group))
        for (let prop of group.props || []) {
          // 这里似乎有点问题！！！
          if (prop.name && prop.path) {
            this.itemProps[prop.name] = new PropMeta(prop)
          }
        }
      }
    }
  }

  /**
   * 创建实例数据
   * @param id 版本信息
   */
  createData(id: number, box: BoxDescriptor | null) {

    let data = ImmutableMap({
      id,
      parent: null,
      name: this.name,
      group: this.group,
      style: fromJS(this.style || {}) as ImmutableMap<string, any>,
      children: [],
      allowDrag: true,
      isMoving: false,
      passProps: fromJS(this.defaultProps || {}), // 原始信息，以及属性编辑器中通过path来确定传递给组件的数据
      box
    })

    // 将itemProps中有default的passProps添加到data的passProps中
    for(let key in this.itemProps) {
      const prop = this.itemProps[key]
      if(prop.config.default !== undefined) {
        data = PropMeta.setPropValue(prop.path, data, prop.config.default)
      }
    }

    // default的style会把data中的style覆盖，所有需要再赋值一遍重新覆盖
    data = data.update("style", (style: any) => {
      const metaStyle = fromJS(this.style) as ImmutableMap<string, any>
      return style.merge(metaStyle)
    })

    return data
  }

  createDataFromJson(json: JsonNode) {
    const box = new BoxDescriptor(json.box, this)
    return fromJS({
      ...json,
      box
    }) as ImmutableMap<string, any>
  }
}
