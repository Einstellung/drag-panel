import { ComponentList } from "../components/ComponentList"
import { Panel } from "../components/render/panel"
import { useEditor } from "../hooks/useEditor"
import style from "./ui.module.scss"

export const Editor = () => {

  // useEditor()
  return <div className={style.container}>
    <ComponentList />
    <Panel />
  </div>
}