import { Bridge } from "../../../meta"
import { useListenChildrenUpdate } from "../../hooks/useListenChildrenUpdate"
import { ListRender } from "./ListRender"

export const Root = ({bridge}: {
  bridge: Bridge
}) => {
  console.log("进入了root")
  useListenChildrenUpdate(bridge.getNode())
  return (
    <ListRender bridge={bridge}/>
  )
}