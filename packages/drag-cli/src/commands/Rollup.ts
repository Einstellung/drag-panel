import Command from "src/interface/Command";
import RollupPackager from "src/rollup/RollupPackager";
import { loadConfig } from "src/utils";

/** 传入yml文件位置，实现打包构建 */
export default class Rollup implements Command {
  name = "rollup"

  async run(argv: any) {
    const config = loadConfig(argv.yml)
    const rollupPackager = new RollupPackager(config, process.cwd())

    await rollupPackager.build()
  }
}