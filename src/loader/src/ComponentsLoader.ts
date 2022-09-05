// import yaml from "js-yaml"
import { ComponentMeta, ComponentMetaConfig, metaSchema } from "../../meta";
import * as R from 'ramda'
import defaultObj from "../yml/default.yml"
import buttonObj from "../yml/button.yml"
import rootObj from "../yml/root.yml"
import pageObj from "../yml/page.yml"
import { deepMerge } from "./deepMerge";
import { Validator } from "jsonschema"
import { load } from "js-yaml";

// 存放DSL实例
const metas: {[key: string]: ComponentMeta} = {}
// 存放遍历的DSL数据
const ymls: {[key: string]: ComponentMetaConfig} = {}

// 遍历yml，并将结果赋值给ymls
// const objects = import.meta.glob("../yml/*.yml")
// Object.keys(objects).forEach(key => {
//   key = key.replace("../yml/", "")
//   const fileName = key.split(".")[0]
//   if(fileName !== "default") {
//     const config = buttonObj as ComponentMetaConfig
//     ymls[config.group + "." + config.name] = config
//   }
// })

const ymlObjs = [buttonObj, rootObj, pageObj]
for (let config of ymlObjs ) {
  ymls[config.group + "." + config.name] = config as ComponentMetaConfig
}

// async function loadDefault() {
//   const val = import("../yml/default.yml")
//   const config = val.default as ComponentMetaConfig
//   return config
// }

function validateConfig(fileName: string, config: ComponentMetaConfig) {
  const v = new Validator()
  const result = v.validate(config, metaSchema)

  if(result.errors.length > 0) {
    const error = result.errors[0]
    throw new Error(`validate error in ${fileName}:` + error.stack)
  }
}

export class ComponentsLoader {

  private static inst = new ComponentsLoader()
  static defaultProps = defaultObj as ComponentMetaConfig

  list: Array<ComponentMeta> = []

  static get() {
    return ComponentsLoader.inst
  }

  loadByName(group: string, name: string) {
    const key = group + "." + name
    if(!metas[key]) {
      const props = R.clone(ComponentsLoader.defaultProps)

      if (!ymls[key]) {
        throw new Error("Type " + key + " not found.")
      }
      const customProps = ymls[key]
      const merged = deepMerge(props, customProps)
      // validateConfig(key, merged)

      const meta = new ComponentMeta(merged)
      metas[key] = meta
    }
    return metas[key]
  }

  load() {
    for(let key in ymls) {
      const [group, name] = key.split(".")
      this.loadByName(group, name)
    }
    this.list = Object.values(metas)
  }
}

// ComponentsLoader.get().load()