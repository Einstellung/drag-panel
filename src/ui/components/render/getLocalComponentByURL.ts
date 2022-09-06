import { ComponentType } from "react";
import { Button } from "../localComponents/Button";
import { Root } from "../localComponents/Root";
import { Page } from "../localComponents/Page";
import { UIComponentProps } from "../../../meta";

const localComponentsMap: {[key: string]: Function} = {}

localComponentsMap["local.Root"] = Root
localComponentsMap["local.Page"] = Page
localComponentsMap["local.Button"] = Button

export function getLocalComponentByURL(url: string): ComponentType<UIComponentProps> | null {
  return localComponentsMap[url] as ComponentType<UIComponentProps> || null
}