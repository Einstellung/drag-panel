import { ComponentType } from "react";
import { Button } from "../localComponents/Button";
import { Root } from "../localComponents/Root";

const localComponentsMap: {[key: string]: Function} = {}

localComponentsMap["local.Button"] = Button
localComponentsMap["local.Root"] = Root

export function getLocalComponentByURL(url: string): ComponentType | null {
  return localComponentsMap[url] as ComponentType || null
}