import { useEffect, useMemo, useState } from "react";
import { Topic } from "@drag/utils";
import { ProjectEditorInst } from "./ProjectEditorInst";

export function useProjectEditor(projectName: string) : [
  ProjectEditorInst, number, string, string
] {
  const editor = useMemo(() => new ProjectEditorInst(projectName), [])

  const [ver, setVer] = useState(0)
  const [fileContent, setFileContent] = useState("")
  const [type, setType] = useState("")

  useEffect(() => {
    let selectFileName = ""
    // todo!!
    // editor.on(Topic.Loaded, () => {
    //   setVer(x => x+1)
    // })

    // editor.on(Topic.fileClicked, (data: string) => {
    //   // 只有先点击导航栏才能显示内容，那么这个时候其实已经知道文件名了
    //   selectFileName = data
    //   const content = editor.getSelectedFileContent(data)
    //   const fileType = data.split(".").pop() || ""

    //   setFileContent(content)
    //   setType(fileType)
    // })

    // editor.on(Topic.fileChanged, (changeContent: string) => {
    //   editor.setSelectedFileContent(selectFileName, changeContent)
    //   editor.debounceSaveContent()
    // })
  }, [])

  return [editor, ver, type, fileContent]
}