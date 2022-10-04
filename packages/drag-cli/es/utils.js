"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = void 0;
const js_yaml_1 = __importDefault(require("js-yaml"));
const fs_1 = __importDefault(require("fs"));
function loadYML(file) {
    return js_yaml_1.default.load(fs_1.default.readFileSync(file, "utf-8"));
}
function loadConfig(ymlFileSrc) {
    try {
        if (!ymlFileSrc) {
            throw new Error("yml file path not specified");
        }
        const config = loadYML(ymlFileSrc);
        return config;
    }
    catch (ex) {
        throw (ex);
    }
}
exports.loadConfig = loadConfig;
