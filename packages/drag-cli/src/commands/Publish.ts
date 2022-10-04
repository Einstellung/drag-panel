import { ComponentMetaConfig } from "@drag/meta";
import Command from "src/interface/Command";
import { loadConfig } from "src/utils";
import Rollup from "./Rollup";
import fs from "fs"


export default class Publish implements Command{
  name: string = "publish"

  private checkTarget(config: ComponentMetaConfig) {
    if(!fs.existsSync(config.buildFileSrc)) {
      throw new Error(`Component file ${config.buildFileSrc} not exists.`)
    }
  }

  async run(argv: any) {
    console.info("Publish Component Drag Panel Project")
    console.log("🚀 ~ file: Publish.ts ~ line 18 ~ Publish ~ run ~ argv", argv)
    const config = loadConfig(argv.yml)

    // build
    console.info("开始打包...")
    const rollup = new Rollup()
    await rollup.run(argv)
    this.checkTarget(config)
  }
}