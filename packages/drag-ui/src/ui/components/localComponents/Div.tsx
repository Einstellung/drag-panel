import { Bridge } from "@drag/meta"
import { useListenChildrenUpdate } from "../../hooks/useListenChildrenUpdate"
import { ListRender } from "./ListRender"

export const Div = ({bridge}: {
  bridge: Bridge
}) => {
  useListenChildrenUpdate(bridge.getNode())
  return <ListRender bridge={bridge}/>
}