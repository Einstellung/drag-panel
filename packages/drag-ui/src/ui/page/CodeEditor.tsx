import { createContext } from "react"
import { CodePanel, fileType } from "../code-editor/CodePanel"
import { Explorer } from "../code-editor/Explorer"
import { CodeEditorInst } from "../code-editor/CodeEditorInst"
import { useCodeEditor } from "../code-editor/useCodeEditor"
import { TitleBar } from "../components/frame/TitleBar"
import { CaretRightOutlined, ControlOutlined } from '@ant-design/icons'
import { message } from "antd"
import classes from "./ui.module.scss"

export const EditorContext = createContext<CodeEditorInst | null>(null)

export const CodeEditor = () => {
  const [editor, ver, fileType, fileContent] = useCodeEditor("codeless")
  return (
    <EditorContext.Provider value={editor}>
      <TitleBar>
        <CaretRightOutlined
          onClick={async (e) => {
            try {
              await editor.build()
              message.success("编译成功")
            } catch(ex) {
              console.error(ex)
              message.error("编译失败")
            }
          }}
          style={{fontSize: "32px", color: "green"}}
        />
      </TitleBar>
      <div className={classes['code-editor']}>
        <Explorer />
        <CodePanel fileType={fileType as fileType} fileContent={fileContent}/>
      </div>
    </EditorContext.Provider>
  )
}