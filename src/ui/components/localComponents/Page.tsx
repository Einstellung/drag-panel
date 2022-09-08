import { Bridge } from "../../../meta"
import { useListenChildrenUpdate } from "../../hooks/useListenChildrenUpdate"
import { ListRender } from "./ListRender"

export const Page = ({bridge}: {
  bridge: Bridge
}) => {
  useListenChildrenUpdate(bridge.getNode())
  return (
    <ListRender bridge={bridge}/>
  )
}