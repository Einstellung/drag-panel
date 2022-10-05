import { useContext } from "react"
import { EditorContext } from "../page/CodeEditor"
import { FileTreeNode } from "@drag/code-model"
import classes from "./code.module.scss"
import { CodeTopic } from "./codeTopic"

/** 渲染左侧文件树 */
export const Explorer = () => {

  const editor = useContext(EditorContext)!

  return (
    <div className={classes.explorer}>
      <FileItem file={ editor.getProject().getRoot() }/>
    </div>
  )
}

const FileItem = ({file}: {
  file: FileTreeNode
}) => {
  const editor = useContext(EditorContext)!

  if(file.getType() === "file") {
    return (
      <div className={classes['explorer-file']}
        onClick={() => {
          editor.emit(CodeTopic.fileClicked, file.getFileName())
        }}
      >
        {file.getFileName()}
      </div>
    )
  }

  return (
    <div className={classes['explorer-dir']}>
      <div>{file.getFileName()}</div>
      {
        file.getChildren().map((x,i) => {
          return <FileItem file={x} key={i}/>
        })
      }
    </div>
  )
}