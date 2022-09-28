import { ElementType, useContext, useEffect, useRef } from "react"
import { Bridge, Node, UIComponentProps, UIComponentRenderOptions } from "../../meta"
import { getLocalComponentByURL } from "../getLocalComponentByUrl"
import { RenderContext } from "./RenderContext"
import classes from "./render.module.scss"


function _render(node: Node, options: UIComponentRenderOptions) {
  const renderElement = (
    <NodeRender 
      node={node}
      key={options.key}
    />
  )

  return renderElement
}

const Style = ({node, children, style}: {
  node: Node,
  children: JSX.Element,
  style: any
}) => {

  const box = node.getBox()

  const context = useContext(RenderContext)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    node.setMount(ref.current!, context.cord)
  })

  return (
    <div
      className={classes["dragPanel-" + node.getName()]}
      ref={ref}
      style={{
        left: box.left.toString(),
        top : box.top.toString(),
        width: box.width.toString(),
        height: box.height.toString(),
        ...style,
        ...node.getStyleObj()
      }}
    >
      {children}
    </div>
  )
}

const InnerRender = ({node, C}: {
  node: Node,
  C: ElementType<UIComponentProps>
}) => {

  const passProps = node.getPassProps().toJS()
  const bridge = new Bridge(node, "render")
  bridge.renderForReact = _render

  return(
    <Style node={node}
      style={{position: node.getBox().position}}
    >
      <C bridge={bridge} passProps={passProps}/>
    </Style>
  )
}

export const NodeRender = ({node}: {
  node: Node
}) => {

  // 当发现是root的时候直接跳过root，进入page渲染
  // 为了实现page页面居中，要把top和left清零，并且设置样式为margin 0 auto
  if(node.getName() === "root") {
    node = node.getChildren()[0]
    node.setXY(0, 0)
  }

  if(node.meta.url) {
    const localComponent = getLocalComponentByURL(node.meta.url)
    if(localComponent) {
      return <InnerRender node={node} C={localComponent}/>
    }
  }
  throw new Error(`Component ${node.getGroup() + "." + node.getName()} not found`)
}