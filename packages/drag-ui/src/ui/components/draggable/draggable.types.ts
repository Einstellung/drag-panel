import { DragNode } from "./DragNode"

export type DragEvents = {
  onDragStart ? : (e: DragNode) => void
  onDragEnd ? : (e: DragNode) => void
  onDrag ? : (e: DragNode) => void
}