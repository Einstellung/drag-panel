import { ComponentMetaConfig } from "@drag/meta";
import fs from "fs"
import path from "path"
import { rollup } from "rollup";
import { RollupConfig } from "./RollupConfig";

// 打包实例
export default class RollupPackager {
  constructor(
    private config: ComponentMetaConfig,
    private cwd: string
  ) {}

  private tmpConfigPath() {
    return path.resolve(this.cwd, `tmp-${this.config.componentType}.tsconfig.json`)
  }

  private rmTmpTsConfig() {
    fs.unlinkSync(this.tmpConfigPath())
  }

  async build() {
    try {

      fs.copyFileSync(
        path.resolve(__dirname, `../../resource/tmp-${this.config.componentType}.tsconfig.json`), 
        this.tmpConfigPath()
      )

      const config = new RollupConfig(this.config, this.cwd)
      const bundle = await rollup(config.inputOptions())
      const { output } = await bundle.generate(config.outputOptions())

      for (const chunkOrAsset of output) {
        if (chunkOrAsset.type === "asset") {
          console.info("[Asset]", chunkOrAsset.fileName)
        } else {
          console.info("[Chunk]", chunkOrAsset.fileName)
        }
      }

      await bundle.write(config.outputOptions())
      await bundle.close()
      return config.outputOptions().file
    }
    catch(ex) {
      console.log(ex)
    }
    // 无论打包是否成功，都要将临时创建的tsconfig文件删除
    finally {
      this.rmTmpTsConfig()
    }
  }
}