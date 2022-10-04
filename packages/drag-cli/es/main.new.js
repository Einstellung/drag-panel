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
const yargs_parser_1 = __importDefault(require("yargs-parser"));
const figlet_1 = __importDefault(require("figlet"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
function ucFirst(str) {
    const [a, ...others] = [...str];
    return a.toUpperCase() + others.join("");
}
if (process.env.NODE_ENV !== 'development') {
    process.env.NODE_ENV = 'production';
}
const argv = (0, yargs_parser_1.default)(process.argv);
console.log(figlet_1.default.textSync("Upload"));
let cmd = argv._[2];
if (!cmd) {
    console.error(chalk_1.default.red("Command is needed!"));
    // printHelper()
    process.exit(-1);
}
cmd = ucFirst(cmd);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const module = './commands/' + cmd;
        console.log(path_1.default.resolve(__dirname, module + ".ts"));
        const cmdClass = require('./commands/' + cmd).default;
        const inst = new cmdClass();
        try {
            yield inst.run(argv);
        }
        catch (ex) {
            console.error(ex);
        }
    });
}
run();
