import { cloneElement, ElementType, useContext, useEffect, useRef, useState } from "react"
import { Bridge, Node, UIComponentRenderOptions } from "../../../meta"
import { Draggable } from "../draggable/Draggable"
import { getLocalComponentByURL } from "./getLocalComponentByURL"
import { UIComponentProps } from "../../../meta";
import { RenderContext } from "./RenderContext";

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

function Styled({node, children, style}: {
  node: Node,
  children: JSX.Element,
  style?: any // 需要style，把父组件样式传过来
}) {
  const box = node.getBox()
  const ref = useRef<HTMLDivElement>(null)
  const context = useContext(RenderContext)

  useEffect(() => {
    node.setMount(ref.current!, context.cord)
    console.log("this touch node", node)

    // @ts-ignore
    window.mount = node.getMountPoint()
  })
  
  return(
    <div
      ref={ref}
      className={"dragPanel-" + node.getName()}
      style={{
        // left: box.left.toString(),
        // top: box.top.toString(),
        width: box.width.toString(),
        height: box.height.toString(),
        position: box.position,
        ...style,
        ...node.getStyleObj(), // yml样式
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

  const passProps = node.getPassProps().toJS()

  const box = node.getBox()
  return (
    <Draggable
      initialPosition={[box.left.toString(), box.top.toString()]}
    >
      <Styled
        node={node}
      >
        <C bridge={bridge} passProps={passProps}/>
      </Styled>
    </Draggable>
  )
}

export const NodeRender = ({node}: {
  node: Node
}) => {
  console.log("node meta val", node?.meta.url)
  if(node.meta.url) {
    const localComponent = getLocalComponentByURL(node.meta.url)
    if(localComponent) {
      return <InnerRender node={node} C={localComponent}/>
    }
  }
  throw new Error(`Component ${node.getGroup() + "." + node?.getName()} not found.`)
}
