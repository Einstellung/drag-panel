import { useEffect, useState } from "react"
import { Node } from "../../../meta"
import { Draggable } from "../draggable/Draggable"

function Styled({node, children}: {
  node: Node,
  children: JSX.Element
}) {
  const box = node.getBox()

  return(
    <div
      style={{
        left: box.left.toString(),
        top: box.top.toString(),
        width: box.width.toString(),
        height: box.height.toString(),
      }}
    >
      {children}
    </div>
  )
}



function InnerRender({node}: {
  node: Node | null
}) {
  
  let box
  return (
    <div>
      <Draggable
        onDragEnd={e => {
        console.log("val test")
      }}
        onDrag={e => {
          console.log("on drag")
        }}
      >
        <h1 
          draggable
          style={{
            width: "fit-content"
          }}
          onClick={() => {
            const box = node?.getBox()
            console.log("🚀 ~ file: NodeRender.tsx ~ line 49 ~ box", box)
          }}
          >
            面板
        </h1>
      </Draggable>
    </div>
  )
}

export const NodeRender = ({node}: {
  node: Node | null
}) => {
  return <InnerRender node={node}/>
}

// export const NodeRender = () => {
//   return <InnerRender/>
// }