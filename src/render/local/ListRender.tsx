import { Bridge } from "../../meta"

export const ListRender = ({bridge}: {
  bridge: Bridge
}) => {

  const node = bridge.getNode()

  return (
    <>
      {
        node.getChildren().map(child => {
          return bridge.render(child, {
            key: child.getId() + ""
          })
        })
      }
    </>
  )
}