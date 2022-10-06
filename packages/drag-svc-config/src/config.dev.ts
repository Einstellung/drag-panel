const config = {
  codeProjectUploadOSS: "/code-project-update",
  getCodeProject: (projectName: string) => {
    return `http://localhost:4003/code-project/${projectName}`
  }
}

export default config