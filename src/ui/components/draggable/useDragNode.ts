import { useEffect, useMemo, useState } from "react";
import { DragEvents } from "./draggable.types";
import { DragNode } from "./DragNode";

export function useDragNode(props: DragEvents): [DragNode, typeof handlers] {
  const node = useMemo<DragNode>(() => new DragNode(), [])
  const [ver, setVer] = useState(0)

  useEffect(() => {
    
  }, [ver])
  
  const handlers = {
    onMouseDown: (e: DragEvent) => {
      // props.onDragEnd && props.onDragEnd(node)
      console.log(11111111)
      node.dragging = true
      node.start(e)
    },
    onMouseMove: (e: MouseEvent) => {
      if(node.dragging) {
        console.log(22222222)
        node.update(e)
        setVer(x => x + 1)
      }
    },
    onMouseUp: (e: MouseEvent) => {
      if(node.dragging) {
        console.log(33333333)
        node.update(e)
        node.dragging = false
        node.init()
      }
    }
  }

  return [node, handlers]
}