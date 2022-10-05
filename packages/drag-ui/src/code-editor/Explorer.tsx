import { useContext } from "react"
import { EditorContext } from "./ProjectEditor"
import { FileTreeNode } from "@drag/code-model"
import classes from "./code.module.scss"
import { Topic } from "@drag/utils"

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
      <div className={classes['editor-file']}
        onClick={() => {
          // todo!!
          // editor.emit(Topic.fileClicked, file.getFileName())
        }}
      >
        {file.getFileName()}
      </div>
    )
  }

  return (
    <div className={classes['editor-dir']}>
      <div>{file.getFileName()}</div>
      {
        file.getChildren().map((x,i) => {
          return <FileItem file={x} key={i}/>
        })
      }
    </div>
  )
}