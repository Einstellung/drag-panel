import { ComponentList } from "../components/ComponentList"
import { NodeRender } from "../components/render/NodeRender"
import { Panel } from "../components/render/Panel"
import { useEditor } from "../hooks/useEditor"
import style from "./ui.module.scss"

export const Editor = () => {

  const editor = useEditor()
  return <div className={style.container}>
    <ComponentList editor={editor}/>
    <Panel editor={editor}>
      <NodeRender node={editor.getNode()}/>
    </Panel>
  </div>
}