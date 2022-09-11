import { mergeDeepLeft } from "ramda"
import { cloneElement } from "react"
import { DragEvents } from "./draggable.types"
import { useDragNode } from "./useDragNode"

type DraggableProps = {
  initialPosition: [string, string],
  children: JSX.Element,
  dragEnable: boolean
} & DragEvents

export const Draggable = (props: DraggableProps) => {

  const [node, handlers] = useDragNode(props)

  const style: any = {
    position: "absolute",
    left: props.initialPosition[0],
    top: props.initialPosition[1],
  }

  if(props.dragEnable) {
    style.transform = `translate(${node.diffX}px, ${node.diffY}px)`
  }

  const draggableProps = {
    draggable: props.dragEnable,
    style,
    dragHandlers: handlers,
  }

  const finalProps = mergeDeepLeft(props.children.props, draggableProps)

  return cloneElement(props.children, finalProps)
}