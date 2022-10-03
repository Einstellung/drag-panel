import { Bridge } from "@drag/meta"
import { ListRender } from "./ListRender"

export const Page = ({bridge}: {
  bridge: Bridge
}) => {
  return <ListRender bridge={bridge}/>
}