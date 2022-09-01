import { UIEvents, UIModel } from "../../object/UIModel"
import style from "./render.module.scss"
export const Panel = ({children, editor}: {
  children: JSX.Element,
  editor: UIModel
}) => {
  return (
    <div 
      className={style.panel}
      onMouseMove={e => {
        editor.dispatch(UIEvents.EvtAddDraging, [e.clientX, e.clientY])
      }}
      onMouseUp={e => {
        editor.dispatch(UIEvents.EvtDrop)
      }}
    >
      {children}
    </div>
  )
}