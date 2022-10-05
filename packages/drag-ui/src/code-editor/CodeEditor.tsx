import Editor from "@monaco-editor/react"
import { useContext } from "react"
import { Topic } from "@drag/utils"
import classes from "./code.module.scss"
import { EditorContext } from "./ProjectEditor"

const extToLang = {
  "ts" : "typescript",
  "json" : "json"
}

export type fileType = "ts" | "json"
export const CodeEditor = ({fileType, fileContent}: {
  fileType: fileType,
  fileContent: string
}) => {
  const editor = useContext(EditorContext)!
  return (
    <div className={classes['code-editor']}>
      <Editor 
      language={extToLang[fileType || "typescript"]}
      value={fileContent}
      theme="vs-dark"
      onChange={changeContent => {
        // todo!!
        // editor.emit(Topic.fileChanged, changeContent)
      }}
      options={{
        fontSize: 28
      }}/>
    </div>
  )
}