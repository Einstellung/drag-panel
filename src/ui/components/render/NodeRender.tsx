import { cloneElement, ElementType, useContext, useEffect, useRef, useState } from "react"
import { Bridge, Node, Topic, UIComponentRenderOptions } from "../../../meta"
import { Draggable } from "../draggable/Draggable"
import { getLocalComponentByURL } from "./getLocalComponentByURL"
import { UIComponentProps } from "../../../meta";
import { RenderContext } from "./RenderContext";
import { UIEvents } from "../../object/UIModel";
import { useSubscribe } from "../../hooks/useSubscribe";
import { Selectable } from "../selectable/Selectable";

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

function Styled({node, children, style, draggable, dragHandlers}: {
  node: Node,
  children: JSX.Element,
  style?: any // 需要style，把父组件样式传过来
  draggable?: boolean // 同理要传draggable过来，要这里写一下
  dragHandlers?: any
}) {
  const box = node.getBox()
  const ref = useRef<HTMLDivElement>(null)
  const context = useContext(RenderContext)

  useEffect(() => {
    node.setMount(ref.current!, context.cord)
  }, [])

  useSubscribe([node, Topic.MouseDownEventPass], (e: MouseEvent) => {
    dragHandlers && dragHandlers.onMouseDown && dragHandlers.onMouseDown(e)
  })

  useSubscribe([node, Topic.MouseMoveEventPass], (e: MouseEvent) => {
    dragHandlers && dragHandlers.onMouseMove && dragHandlers.onMouseMove(e)
  })

  useSubscribe([node, Topic.MouseUpEventPass], (e: MouseEvent) => {
    dragHandlers && dragHandlers.onMouseUp && dragHandlers.onMouseUp(e)
  })
  
  return(
    <div
      ref={ref}
      draggable={draggable}
      className={"dragPanel-" + node.getName()}
      style={{
        width: box.width.toString(),
        height: box.height.toString(),
        position: box.position,
        ...style,
        ...node.getStyleObj(), // yml样式
      }}
    >
      {/* {children} */}
      {cloneElement(children, {
        ...children.props,
        DragHandlerOnMouseDown: dragHandlers?.onMouseDown
      })}
    </div>
  )
}


function InnerRender({node, C}: {
  node: Node,
  C: ElementType<UIComponentProps>
}) {

  function selectionChangeHandler(selected: boolean) {
    if(selected) {
      editor.dispatch(UIEvents.EvtSelected, node)
    } else {
      editor.dispatch(UIEvents.EvtCancelSelect)
    }
  }
  
  const context = useContext(RenderContext)
  const editor = context.editor!

  const [, setVer] = useState(0)
  // 数据发生变更时要触发重新渲染更新初始数据
  useSubscribe([node, [Topic.NodeMoved, Topic.Resized, Topic.NodePropUpdated]], () => {
    setVer(x => x + 1)
  })

  const bridge = new Bridge(node)
  bridge.renderForReact = _render

  const passProps = node.getPassProps().toJS()

  const box = node.getBox()
  return (
    <Draggable
      initialPosition={[box.left.toString(), box.top.toString()]}
      dragEnable={node.isDraggable()}
      onDrag={e => {
        if(node.isDraggable()) {
          editor.dispatch(UIEvents.EvtNodeSyncMoving, node, [e.diffX, e.diffY])
        }
      }}
      onDragEnd={e => {
        if(node.isDraggable()) {
          editor.dispatch(UIEvents.EvtNodeMoved, node, [e.diffX, e.diffY])
        }
      }}
    >
      <Styled
        node={node}
      >
        <Selectable
          onSelectChanged={selectionChangeHandler}
          node={node}
        >
          <C bridge={bridge} passProps={passProps}/>
        </Selectable>
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
