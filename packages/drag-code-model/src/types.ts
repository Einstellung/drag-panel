export type ProjectType = "codeless" | "faas"

export type FileType = "dir" | "file"

export type FileNodeJSON = {
  type: FileType,
  fileName: string,
  url: string,
  children?: FileNodeJSON[]
}

export type PorjectJSON = {
  name: string,
  fileTree: FileNodeJSON,
  version: number,
  projectBuildUrl: string
}