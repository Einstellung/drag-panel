import { Map as ImmutableMap } from "immutable"
import { BoxDescriptor } from "./BoxDescriptpr"
import { Bridge } from "./Bridge"
import { Node } from "./instance/Node"

export type SizeMode =  "fill" | "value" | "fixed" | 'auto'

export type SizeUnitInput = {
	value : number,
	unit : string,
	mode :  SizeMode 
}

export type CSSPosition = "absolute" | "relative" 
export type CSSDisplay = "block" | "flex" 
export type FlexDirection = "row" | "column"| ""

export type BoxDescriptorInput = {
	movable? : boolean,
	resizable? : boolean,
	container ? : boolean
	position? : CSSPosition,
	display? : CSSDisplay,
	flexDirection? : FlexDirection,
	selectable ? : boolean
  left?: number | string | SizeUnitInput
  top?: number | string | SizeUnitInput
  width: number | string | SizeUnitInput
  height: number | string | SizeUnitInput
  marginLeft?: number | string | SizeUnitInput
  marginTop?: number | string | SizeUnitInput
  marginRight?: number | string | SizeUnitInput
  marginBottom?: number | string | SizeUnitInput
}

export type NodeData = ImmutableMap<string, any>

export type NodeType = Node

type BasicJsonNode = {
	type?: string,
	group: string,
	style?: any,
	name: string,
	children?: Array<JsonNode>,
	id?: number,
	passProps?: any
}

export type NodeInstanceJsonStructure = BasicJsonNode & {
	box: BoxDescriptor
}

export type JsonNode = BasicJsonNode & {
	box: BoxDescriptorInput
}

export type JsonPage = {
	page: JsonNode
}

export type UIComponentProps = {
  bridge: Bridge,
  [key: string]: any
}

export type UIComponentRenderOptions = {
	key: string,
	passProps?: any
}