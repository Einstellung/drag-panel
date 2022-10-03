import { useEffect, useMemo, useState } from "react";
import { DragEvents } from "./draggable.types";
import { DragNode } from "./DragNode";

export function useDragNode(props: DragEvents): [DragNode, typeof handlers] {
  const node = useMemo<DragNode>(() => new DragNode(), [])
  // 为了让数据刷新的时候draggable的transform样式发生改变，这里要做更新
  const [ver, setVer] = useState(0)

  useEffect(() => {
    
  }, [ver])
  
  const handlers = {
    onMouseDown: (e: DragEvent) => {
      node.dragging = true
      node.start(e)
      props.onDragStart && props.onDragStart(node)
    },
    onMouseMove: (e: MouseEvent) => {
      if(node.dragging) {
        node.update(e)
        setVer(x => x + 1)
        props.onDrag && props.onDrag(node)
      }
    },
    onMouseUp: (e: MouseEvent) => {
      if(node.dragging) {
        props.onDragEnd && props.onDragEnd(node)
        node.update(e)
        node.dragging = false
        node.init()
      }
    }
  }

  return [node, handlers]
}