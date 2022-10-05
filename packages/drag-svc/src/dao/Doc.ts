import { DataTypes, Model, Optional } from "sequelize"
import DB from "./DB"

interface DocAttributes {
	id : number,
	type : string,
	idx : string,
	doc : string
}

interface DocCreationAttributes extends Optional<DocAttributes, "id"> {}

export class Doc extends Model<DocAttributes, DocCreationAttributes>{
	public id!:number
}

Doc.init({
	id : {
		type : DataTypes.INTEGER,
		autoIncrement :true,
		primaryKey : true
	},
	type : {
		type : DataTypes.STRING,
	},
	idx : {
		type : DataTypes.STRING,
		unique : true
	},
	doc: {
		type : DataTypes.JSON
	}

}, {
	sequelize : DB.getSequelize(),
	modelName : "Doc",
	tableName : 'doc'
})