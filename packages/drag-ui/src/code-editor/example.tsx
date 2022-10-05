import Editor from "@monaco-editor/react";

export const MonacoEditorExample = () => {
  return (
    <div>
      <Editor language='typescript' width="100vw" height="100vh" theme="vs-dark"/>
    </div>
  )
}