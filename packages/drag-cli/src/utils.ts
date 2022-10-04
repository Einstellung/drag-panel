import yaml from "js-yaml"
import fs from "fs"
import { ComponentMetaConfig } from "@drag/meta";

function loadYML(file: string) {
  return yaml.load(fs.readFileSync(file, "utf-8"))
}

export function loadConfig(ymlFileSrc: string) {

  try {
    if(!ymlFileSrc) {
      throw new Error("yml file path not specified")
    }
    const config = loadYML(ymlFileSrc) as ComponentMetaConfig
    return config
  }
  catch(ex) {
    throw(ex)
  }
}