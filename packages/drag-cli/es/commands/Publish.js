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
const utils_1 = require("src/utils");
const Rollup_1 = __importDefault(require("./Rollup"));
const fs_1 = __importDefault(require("fs"));
class Publish {
    constructor() {
        this.name = "publish";
    }
    checkTarget(config) {
        if (!fs_1.default.existsSync(config.buildFileSrc)) {
            throw new Error(`Component file ${config.buildFileSrc} not exists.`);
        }
    }
    run(argv) {
        return __awaiter(this, void 0, void 0, function* () {
            console.info("Publish Component Drag Panel Project");
            console.log("🚀 ~ file: Publish.ts ~ line 18 ~ Publish ~ run ~ argv", argv);
            const config = (0, utils_1.loadConfig)(argv.yml);
            // build
            console.info("开始打包...");
            const rollup = new Rollup_1.default();
            yield rollup.run(argv);
            this.checkTarget(config);
        });
    }
}
exports.default = Publish;
