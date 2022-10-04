import yargsParser from "yargs-parser"
import figlet from "figlet"
import chalk from "chalk"
import path from "path"
import Command from "./interface/Command"

function ucFirst(str :string) {
  const [a, ...others] = [...str]
  return a.toUpperCase() + others.join("")
}

if(process.env.NODE_ENV !== 'development') {
  process.env.NODE_ENV = 'production'
}

const argv = yargsParser(process.argv)

console.log(figlet.textSync("Upload") )
let cmd = argv._[2] as string

if(!cmd) {
  console.error(chalk.red("Command is needed!"))
  // printHelper()
  process.exit(-1)
}

cmd = ucFirst(cmd)

async function run() {
  const module = './commands/' + cmd
  console.log(path.resolve(__dirname, module + ".ts"))

  const cmdClass = require('./commands/' + cmd ).default
  const inst: Command = new cmdClass()

  try{
    await inst.run(argv)
  }catch(ex) {
    console.error(ex)
  }
}

run()