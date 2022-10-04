"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollupConfig = void 0;
const plugin_replace_1 = __importDefault(require("@rollup/plugin-replace"));
const plugin_url_1 = __importDefault(require("@rollup/plugin-url"));
const plugin_node_resolve_1 = __importDefault(require("@rollup/plugin-node-resolve"));
const plugin_commonjs_1 = __importDefault(require("@rollup/plugin-commonjs"));
const rollup_plugin_typescript2_1 = __importDefault(require("rollup-plugin-typescript2"));
class RollupConfig {
    constructor(config, cwd) {
        this.config = config;
        this.cwd = cwd;
    }
    pluginsForReact() {
        const isProd = process.env.NODE_ENV === "production";
        const plugins = [
            // 用于替换字符串
            // 将node中的状态映射到react对应的状态值
            (0, plugin_replace_1.default)({
                preventAssignment: true,
                "process.env.NODE_ENV": JSON.stringify(isProd ? 'production' : 'development')
            }),
            // 对svg文件做处理，如果是大的会变成文件，小的直接就是base64
            (0, plugin_url_1.default)({
                limit: 8 * 1024,
                include: ["**/*.svg"],
                emitFiles: true,
            }),
            // 定义import的时候找文件的算法，什么地方使用import来找文件
            (0, plugin_node_resolve_1.default)({
                extensions: ['js', 'jsx', 'ts', 'tsx']
            }),
            // rollup没有原生支持commonjs，如果打包内容里面有commonjs，需要这个
            (0, plugin_commonjs_1.default)({
                include: "node_modules/**"
            }),
            // 处理postcss
            // postcss({
            //   use : ['sass']
            // }),
            // ts对react支持比较好，直接使用ts就搞定了，vue才需要babel
            (0, rollup_plugin_typescript2_1.default)({
                // 依赖cli自己版本的ts，固话版本，不依赖依赖用户的ts，防止出错
                typescript: require('typescript'),
                // 用的时候会把这个文件拷贝到工作路径，然后再删除
                // tsconfig : path.resolve(this.cwd, "tmp-react.tsconfig.json"),
            })
        ];
        return plugins;
    }
    inputOptionReact() {
        return {
            input: this.config.sourceFileSrc,
            plugins: this.pluginsForReact(),
            external: ["react", "react-dom"]
        };
    }
    inputOptions() {
        switch (this.config.componentType) {
            case "react":
                return this.inputOptionReact();
            default:
                throw new Error("unknown usage: " + this.config.componentType);
        }
    }
    outputOptions() {
        return {
            file: `build/${this.config.name}.js`,
            format: "amd",
            name: this.config.name
        };
    }
}
exports.RollupConfig = RollupConfig;
