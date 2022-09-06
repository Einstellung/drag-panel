import { cloneElement, ElementType, useEffect, useState } from "react"
import { Bridge, Node, UIComponentRenderOptions } from "../../../meta"
import { Draggable } from "../draggable/Draggable"
import { getLocalComponentByURL } from "./getLocalComponentByURL"
import { UIComponentProps } from "../../../meta";

/** 渲染组件子组件 */
function _render(node: Node, options: UIComponentRenderOptions) {
  const reactElement = (
    <NodeRender 
      node={node}
      key={options.key}
    />
  )

  return reactElement
}

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
  node: Node,
  C: ElementType<UIComponentProps>
}) {
  
  const bridge = new Bridge(node)
  bridge.renderForReact = _render
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
          <C bridge={bridge}/>
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
