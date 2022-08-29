import { BoxDescriptor } from "../BoxDescriptpr"
import { BoxDescriptorInput } from "../standard.types"

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

  // todo
  // 属性编辑器属性
  // editor : PropsEditorConfigure,

  // description : string,

  // 是否为内部组件
  intrinsic? :  boolean,

  // 初始样式
  style? : any,

  author : string,

  // 初始属性
  defaultProps : any,

  // external
  // todo
}

export class ComponentMeta {
  name: string
  group: string
  imageUrl : string
  title : string
  // box : BoxDescriptor
  // intrinsic? :  boolean
  // url? : string
  style? : any
  constructor(config: ComponentMetaConfig) {
    this.name = config.name
    this.group = config.group
    this.imageUrl = config.imageUrl
    this.title = config.title
    // this.intrinsic = config.intrinsic
    this.style = config.style
    // !!初始化的时候似乎box不需要初始化
    // this.box = new BoxDescriptor(config.box)
  }

  /**
   * 创建实例数据
   */
  createData() {

  }
}
