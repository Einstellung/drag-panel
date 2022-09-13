import { MouseEventHandler, useContext } from "react"
import { Node } from "../../../meta"
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
      <div className={styles.selection_frame}>
        {children}
        {node.isDraggable() &&
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
    </div>
  )
}