import { ComponentType } from "react"
import { UIComponentProps } from "../meta"
import { Page } from "./local/Page"
import { Button } from "./local/Button"
import { Image } from "./local/Image"
import { Text } from "./local/Text"
import { Div } from "./local/Div"


const localComponentsMap: {[key: string]: Function} = {}

localComponentsMap["local.Page"] = Page
localComponentsMap["local.Button"] = Button
localComponentsMap["local.Text"] = Text
localComponentsMap["local.Image"] = Image
localComponentsMap["local.Div"] = Div

export function getLocalComponentByURL(url: string): ComponentType<UIComponentProps> | null {
  return localComponentsMap[url] as ComponentType<UIComponentProps> || null
}