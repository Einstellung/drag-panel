const config = {
  codeProjectUploadOSS: "/code-project-update",
  getCodeProject: (projectName: string) => {
    return `http://localhost:4001/code-project/${projectName}`
  }
}

export default config