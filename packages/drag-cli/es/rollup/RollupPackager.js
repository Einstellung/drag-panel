"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const rollup_1 = require("rollup");
const RollupConfig_1 = require("./RollupConfig");
// 打包实例
class RollupPackager {
    constructor(config, cwd) {
        this.config = config;
        this.cwd = cwd;
    }
    tmpConfigPath() {
        return path_1.default.resolve(this.cwd, `tmp-${this.config.componentType}.tsconfig.json`);
    }
    rmTmpTsConfig() {
        fs_1.default.unlinkSync(this.tmpConfigPath());
    }
    build() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                fs_1.default.copyFileSync(path_1.default.resolve(__dirname, `../../resource/tmp-${this.config.componentType}.tsconfig.json`), this.tmpConfigPath());
                const config = new RollupConfig_1.RollupConfig(this.config, this.cwd);
                const bundle = yield (0, rollup_1.rollup)(config.inputOptions());
                const { output } = yield bundle.generate(config.outputOptions());
                for (const chunkOrAsset of output) {
                    if (chunkOrAsset.type === "asset") {
                        console.info("[Asset]", chunkOrAsset.fileName);
                    }
                    else {
                        console.info("[Chunk]", chunkOrAsset.fileName);
                    }
                }
                yield bundle.write(config.outputOptions());
                yield bundle.close();
                return config.outputOptions().file;
            }
            catch (ex) {
                console.log(ex);
            }
            // 无论打包是否成功，都要将临时创建的tsconfig文件删除
            finally {
                this.rmTmpTsConfig();
            }
        });
    }
}
exports.default = RollupPackager;
