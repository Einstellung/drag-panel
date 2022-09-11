import { useContext, useEffect, useState } from "react"
import { Rect, Topic } from "../../../meta"
import { useBound } from "../../hooks/useBound"
import { UIEvents, UIModel } from "../../object/UIModel"
import style from "./render.module.scss"
import { RenderContext } from "./RenderContext"
import { Shadow } from "./Shadow"


export const Panel = ({children, editor}: {
  children: JSX.Element,
  editor: UIModel
}) => {

  const renderContext = useContext(RenderContext)
  renderContext.editor = editor

  // 或许是ref得到的结果是看是第一个relative定位的，在包裹的HTML里面，第一个relative定位的结果会是0
  // 总之通过这种方式得到的rect始终是[left, top]=0
  const [rect, ref] = useBound()

  useEffect(() => {
    if(rect !== Rect.ZERO) {
      renderContext.cord.setViewPort(rect)
    }
  }, [rect])

  return (
    <RenderContext.Provider value={renderContext}>
      <div
        className={style.panel}
        ref={ref}
        onMouseDown={e => {
          e.preventDefault()
          editor.selection?.emit(Topic.MouseDownEventPass, e)
        }}
        onMouseMove={e => {
          e.preventDefault()
          const worldPosition = [
            renderContext.cord.worldX(e.clientX),
            renderContext.cord.worldY(e.clientY)
          ]
          editor.dispatch(UIEvents.EvtAddDraging, worldPosition)

          editor.selection?.emit(Topic.MouseMoveEventPass, e)
        }}
        onMouseUp={e => {
          e.preventDefault()
          editor.dispatch(UIEvents.EvtDrop)

          editor.selection?.emit(Topic.MouseUpEventPass, e)
        }}
      >
        {/* <Shadow regionPosition={regionPosition}/> */}
        {children}
      </div>
    </RenderContext.Provider>
  )
}