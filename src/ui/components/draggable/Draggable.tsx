import { mergeDeepLeft } from "ramda"
import { cloneElement } from "react"
import { DragEvents } from "./draggable.types"
import { useDragNode } from "./useDragNode"

type DraggableProps = {
  initialPosition: [string, string],
  children: JSX.Element
} & DragEvents

export const Draggable = (props: DraggableProps) => {

  const [node, handlers] = useDragNode(props)

  const style = {
    position: "absolute",
    left: props.initialPosition[0],
    top: props.initialPosition[1],
    // transform: `translate(${node.diffX}px, ${node.diffY}px)`
  }

  const draggableProps = {
    style,
    ...handlers,
  }

  const finalProps = mergeDeepLeft(props.children.props, draggableProps)

  return cloneElement(props.children, finalProps)
}