import { Bridge } from "@drag/meta"

export const ListRender = ({bridge, passProps}: {
  bridge: Bridge,
  passProps?: any
}) => {
  const children = bridge.getNode().getChildren()

  return (
    <>
      {
        children.map((childNode, i) => {
          return bridge.render(childNode, {
            key: childNode.getId(),
            passProps
          })
        })
      }
    </>
  )
}