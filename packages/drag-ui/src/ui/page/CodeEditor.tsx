import { createContext } from "react"
import { CodePanel, fileType } from "../code-editor/CodePanel"
import { Explorer } from "../code-editor/Explorer"
import { CodeEditorInst } from "../code-editor/CodeEditorInst"
import { useCodeEditor } from "../code-editor/useCodeEditor"
import { TitleBar } from "../components/frame/TitleBar"
import classes from "./ui.module.scss"

export const EditorContext = createContext<CodeEditorInst | null>(null)

export const CodeEditor = () => {
  const [editor, ver, fileType, fileContent] = useCodeEditor("codeless")
  return (
    <EditorContext.Provider value={editor}>
      <TitleBar />
      <div className={classes['code-editor']}>
        <Explorer />
        <CodePanel fileType={fileType as fileType} fileContent={fileContent}/>
      </div>
    </EditorContext.Provider>
  )
}