import { ComponentMetaConfig } from "@drag/meta"
import { InputOptions, OutputOptions } from "rollup"
import path from "path"
import replace from '@rollup/plugin-replace'
import url from '@rollup/plugin-url'
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from 'rollup-plugin-typescript2'

export class RollupConfig {
  constructor(
    private config: ComponentMetaConfig,
    private cwd: string
  ){}

  private pluginsForReact() {
    const isProd = process.env.NODE_ENV === "production"

    const plugins = [
      // 用于替换字符串
      // 将node中的状态映射到react对应的状态值
      replace({
        preventAssignment : true,
        "process.env.NODE_ENV" : JSON.stringify(isProd ? 'production' : 'development')
      }),
      // 对svg文件做处理，如果是大的会变成文件，小的直接就是base64
      url({
        limit: 8 * 1024,
        include : ["**/*.svg"],
        emitFiles : true,
      }),
      // 定义import的时候找文件的算法，什么地方使用import来找文件
      resolve({
        extensions : ['js', 'jsx', 'ts', 'tsx']
      }),
      // rollup没有原生支持commonjs，如果打包内容里面有commonjs，需要这个
      commonjs({
        include : "node_modules/**"
      }),
      // 处理postcss
      // postcss({
      //   use : ['sass']
      // }),
      // ts对react支持比较好，直接使用ts就搞定了，vue才需要babel
      typescript({
        // 依赖cli自己版本的ts，固话版本，不依赖依赖用户的ts，防止出错
        typescript: require('typescript'),
        // 用的时候会把这个文件拷贝到工作路径，然后再删除
        // tsconfig : path.resolve(this.cwd, "tmp-react.tsconfig.json"),
      })
    ]
    return plugins
  }

  private inputOptionReact(): InputOptions {
    return {
      input: this.config.sourceFileSrc,
      plugins: this.pluginsForReact(),
      external: ["react", "react-dom"]
    }
  }

  inputOptions(): InputOptions {
    switch(this.config.componentType) {
      case "react":
        return this.inputOptionReact()
      default:
        throw new Error("unknown usage: " + this.config.componentType)
    }
  }

  outputOptions(): OutputOptions {
    return {
      file: `build/${this.config.name}.js`,
      format: "amd",
      name: this.config.name
    }
  }
}