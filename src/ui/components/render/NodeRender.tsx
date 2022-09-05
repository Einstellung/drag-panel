import { cloneElement, ElementType, useEffect, useState } from "react"
import { Node } from "../../../meta"
import { Draggable } from "../draggable/Draggable"
import { getLocalComponentByURL } from "./getLocalComponentByURL"

function Styled({node, children}: {
  node: Node | null,
  children: JSX.Element
}) {
  const box = node?.getBox()

  return(
    <div
      style={{
        // left: box.left.toString(),
        // top: box.top.toString(),
        // width: box.width.toString(),
        // height: box.height.toString(),
        fontSize: "20px"
      }}
    >
      {children}
    </div>
  )
}



function InnerRender({node, C}: {
  node: Node | null,
  C: ElementType
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
        <Styled
          node={node}
        >
          <C />
        </Styled>
      </Draggable>
    </div>
  )
}

export const NodeRender = ({node}: {
  node: Node | null
}) => {
  console.log("node meta val", node?.meta.url)
  if(node?.meta.url) {
    const localComponent = getLocalComponentByURL(node.meta.url)
    if(localComponent) {
      return <InnerRender node={node} C={localComponent}/>
    }
  }
  throw new Error(`Component ${node?.getGroup() + "." + node?.getName()} not found.`)
}
