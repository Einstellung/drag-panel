import { Bridge } from "../../../meta"

export const ListRender = ({bridge}: {
  bridge: Bridge
}) => {
  const children = bridge.getNode().getChildren()
  console.log("🚀 ~ file: ListRender.tsx ~ line 7 ~ children", children)

  return (
    <div>
      {
        children.map((childNode, i) => {
          return bridge.render(childNode, {
            key: childNode.getId()
          })
        })
      }
    </div>
  )
}