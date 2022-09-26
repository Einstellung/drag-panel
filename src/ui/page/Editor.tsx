import { ComponentList } from "../components/ComponentList"
import { NodeRender } from "../components/render/NodeRender"
import { Panel } from "../components/render/Panel"
import { useEditor } from "../hooks/useEditor"
import { UIModel } from "../object/UIModel"
import { Tabs } from "antd"
import style from "./ui.module.scss"
import 'antd/dist/antd.css'
import { ComponentPropEditor } from "../components/propeditor/ComponentPropEditor"
import { PageStructure } from "../components/PageStructure"
import { Fragment } from "react"
import { TitleBar } from "../components/frame/TitleBar"

export const Editor = () => {

  const editor = useEditor()
  return (
    <Fragment>
      <TitleBar />
      <div className={style.container}>
        <ComponentList editor={editor} />
        <Panel editor={editor}>
          <NodeRender node={editor.getRoot()} />
        </Panel>
        <div className={style.right}>
          <RightTabs editor={editor} />
        </div>
      </div>
    </Fragment>
  )
}

const RightTabs = ({editor}: {
  editor: UIModel
}) => {
  return (
    <Tabs defaultActiveKey="1" type="card" style={{
      height: "100%"
    }}>
      <Tabs.TabPane tab="属性编辑" key="1">
        <ComponentPropEditor editor={editor}/>
      </Tabs.TabPane>
      <Tabs.TabPane tab="页面结构" key="2">
        <PageStructure editor={editor}/>
      </Tabs.TabPane>
    </Tabs>
  )
}