import { useEffect, useMemo, useState } from "react";
import { CodeTopic } from "./codeTopic";
import { CodeEditorInst } from "./CodeEditorInst";

export function useCodeEditor(projectName: string) : [
  CodeEditorInst, number, string, string
] {
  const editor = useMemo(() => new CodeEditorInst(projectName), [])

  const [ver, setVer] = useState(0)
  const [fileContent, setFileContent] = useState("")
  const [type, setType] = useState("")

  useEffect(() => {
    let selectFileName = ""
    // editor.on(CodeTopic.Loaded, () => {
    //   setVer(x => x+1)
    // })
    editor.on(CodeTopic.Loaded)
      .subscribe(() => {
        setVer(x => x + 1)
      })

    // editor.on(CodeTopic.fileClicked, (data: string) => {
    //   // 只有先点击导航栏才能显示内容，那么这个时候其实已经知道文件名了
    //   selectFileName = data
    //   const content = editor.getSelectedFileContent(data)
    //   const fileType = data.split(".").pop() || ""

    //   setFileContent(content)
    //   setType(fileType)
    // })

    // editor.on(CodeTopic.fileChanged, (changeContent: string) => {
    //   editor.setSelectedFileContent(selectFileName, changeContent)
    //   editor.debounceSaveContent()
    // })

    editor.on(CodeTopic.fileClicked)
      .subscribe((data: string) => {
        // 只有先点击导航栏才能显示内容，那么这个时候其实已经知道文件名了
        selectFileName = data
        const content = editor.getSelectedFileContent(data)
        const fileType = data.split(".").pop() || ""
  
        setFileContent(content)
        setType(fileType)
      })

    editor.on(CodeTopic.fileChanged)
      .subscribe((changeContent: string) => {
        editor.setSelectedFileContent(selectFileName, changeContent)
        editor.debounceSaveContent()
      })
  }, [])

  return [editor, ver, type, fileContent]
}