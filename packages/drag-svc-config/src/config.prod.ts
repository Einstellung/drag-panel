const config = {
  codeProjectUploadOSS: "/code-project-update",
  getCodeProject: (projectName: string) => {
    return `http://localhost:4001/code-project/${projectName}`
  },
  codeBuildFile: (projectType: "codeless" | "faas") => {
    return `http://localhost:4003/build/${projectType}`
  }
}

export default config