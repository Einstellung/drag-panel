import Editor from "@monaco-editor/react"
import { useContext } from "react"
import { CodeTopic } from "./codeTopic"
import classes from "./code.module.scss"
import { EditorContext } from "../page/CodeEditor"

const extToLang = {
  "ts" : "typescript",
  "json" : "json"
}

export type fileType = "ts" | "json"
export const CodePanel = ({fileType, fileContent}: {
  fileType: fileType,
  fileContent: string
}) => {
  const editor = useContext(EditorContext)!
  return (
    <div className={classes['code-panel']}>
      <Editor 
      language={extToLang[fileType || "typescript"]}
      value={fileContent}
      theme="vs-dark"
      onChange={changeContent => {
        editor.emit(CodeTopic.fileChanged, changeContent)
      }}
      options={{
        fontSize: 28
      }}/>
    </div>
  )
}