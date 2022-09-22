import { ComponentType } from "react";
import { Button } from "../localComponents/Button";
import { Image } from "../localComponents/Image";
import { Text } from "../localComponents/Text";
import { Icon } from "../localComponents/Icon";
import { Ipt } from "../localComponents/Input";
import { Div } from "../localComponents/Div";
import { Root } from "../localComponents/Root";
import { Page } from "../localComponents/Page";
import { UIComponentProps } from "../../../meta";

const localComponentsMap: {[key: string]: Function} = {}

localComponentsMap["local.Root"] = Root
localComponentsMap["local.Page"] = Page
localComponentsMap["local.Button"] = Button
localComponentsMap["local.Icon"] = Icon
localComponentsMap["local.Text"] = Text
localComponentsMap["local.Image"] = Image
localComponentsMap["local.Input"] = Ipt
localComponentsMap["local.Div"] = Div

export function getLocalComponentByURL(url: string): ComponentType<UIComponentProps> | null {
  return localComponentsMap[url] as ComponentType<UIComponentProps> || null
}