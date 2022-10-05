import { createContext } from "react"
import { CodeEditor, fileType } from "./CodeEditor"
import { Explorer } from "./Explorer"
import { ProjectEditorInst } from "./ProjectEditorInst"
import { useProjectEditor } from "./useProjectEditor"
import classes from "./code.module.scss"

export const EditorContext = createContext<ProjectEditorInst | null>(null)

export const ProjectEditor = () => {
  const [editor, ver, fileType, fileContent] = useProjectEditor("codeless")
  return (
    <EditorContext.Provider value={editor}>
      <div className={classes['project-editor']}>
        <Explorer />
        <CodeEditor fileType={fileType as fileType} fileContent={fileContent}/>
      </div>
    </EditorContext.Provider>
  )
}