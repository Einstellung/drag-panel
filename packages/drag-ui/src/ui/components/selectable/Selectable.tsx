import { MouseEventHandler, useContext, useState } from "react"
import { Node, Topic } from "@drag/meta"
import { useSubscribe } from "../../hooks/useSubscribe"
import { ResizerNew } from "../../object/Resizer.new"
import { UIEvents } from "../../object/UIModel"
import { RenderContext } from "../render/RenderContext"
import styles from "./selectable.module.scss"

type SelectionProps = {
  children: JSX.Element,
  node: Node,
  onSelectChanged: (selected: boolean) => void,
  DragHandlerOnMouseDown?: MouseEventHandler
}

export const Selectable = ({
  children, 
  node, 
  onSelectChanged,
  DragHandlerOnMouseDown
}: SelectionProps) => {

  const context = useContext(RenderContext)

  // 是否选中来看是否渲染外围选择框和resize
  function isSelected() {
    return context.editor?.selection === node
  }
  const selectedValue = isSelected()

  // selection变更要触发组件重新渲染，更新外围选择框
  const [,setVer] = useState(0)
  useSubscribe([context.editor!, Topic.SelectionChanged], () => {
    setVer(x => x + 1)
  })

  return (
    <div
      // 这里样式还需要调整
      className={styles.selectable}
      onMouseDown={e => {
        e.stopPropagation()
        onSelectChanged(true)
        DragHandlerOnMouseDown && DragHandlerOnMouseDown(e)
      }}
      onMouseUp={e => {
        // e.stopPropagation()
        onSelectChanged(false)
      }}
    >
      {/* 这个div只是渲染外围选择框 */}
      <div className={styles.selection_frame}
        style={{display: selectedValue ? "block" : "none"}}
      />
      {children}
      {selectedValue && node.isDraggable() &&
        ResizerNew.resizerData.map(([name, type]) => {
          return (
            <div
              key={name + ""}
              data-cube={type}
              className={`${styles.cube} ${styles["cube_" + name]}`}
              onMouseDown={e => {
                e.stopPropagation()
                context.editor!.dispatch(UIEvents.EvtStartResize,
                  type,
                  [e.clientX, e.clientY],
                  node)
              }}
            >
            </div>
          )
        })
      }
    </div>
  )
}