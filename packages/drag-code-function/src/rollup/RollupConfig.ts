import path from "path";
import { InputOptions, OutputOptions } from "rollup";
import typescript from 'rollup-plugin-typescript2'
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"

export class RollupConfig {
  constructor(
    private cwd: string
  ) {}

  private plugins() {
    return [
      typescript(),
      commonjs(),
      resolve({
        extensions : ['ts']
      })
    ]
  }

  inputOptions(): InputOptions {
    return {
      input: path.resolve(this.cwd, "src/main.ts"),
      plugins: this.plugins()
    }
  }

  outputOptions(): OutputOptions {
    return {
      file: path.resolve(this.cwd, "build/index.js"),
      format: "amd",
      name: "index.js"
    }
  }
}