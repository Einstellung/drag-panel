import path from "path";
import { Sequelize } from "sequelize";

export default class DB {
  static sequelize: Sequelize

  static getSequelize() {
    if(!DB.sequelize) {
      DB.sequelize = new Sequelize({
        dialect: "sqlite",
        storage: path.resolve(__dirname, 'codeEditor.db'),
        host: "localhost",
        database: "codeEditor" // 是否可以不写？skedo项目中似乎没有写
      })
    }

    return DB.sequelize
  }
}