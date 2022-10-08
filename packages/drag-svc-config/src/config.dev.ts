const config = {
  codeProjectUploadOSS: "http://localhost:4003/code-project-update",
  getCodeProject: (projectName: string) => {
    return `http://localhost:4003/code-project/${projectName}`
  },
  codeBuildFile: (projectType: "codeless" | "faas") => {
    return `http://localhost:4003/build/${projectType}`
  }
}

export default config