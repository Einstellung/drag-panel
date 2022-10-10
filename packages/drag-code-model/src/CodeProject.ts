import { FileTreeNode } from "./FileTreeNode"
import { PorjectJSON, ProjectType } from "./types"

export class CodeProject {

  public static TemplateNames: { [key in ProjectType]: string } = {
    codeless: "codeless",
    faas: "faas"
  }

  private version: number
  private root: FileTreeNode
  private projectName: string
  private projectType: ProjectType
  private projectBuildUrl: string

  constructor(projectName: string, projectType: ProjectType) {
    this.projectName = projectName
    this.root = new FileTreeNode("dir", "root")
    this.version = 0
    this.projectType = projectType
    this.projectBuildUrl = ""
  }

  public getName() {
    return this.projectName
  }

  public getType() {
    return this.projectType
  }

  public setRoot(root: FileTreeNode) {
    this.root = root
  }

  public getRoot() {
    return this.root
  }

  public increVer() {
    this.version++
  }

  public toJSON(): PorjectJSON {
    return {
      name: this.projectName,
      fileTree: this.getRoot().toJSON(),
      version: this.version,
      projectBuildUrl: this.projectBuildUrl
    }
  }

  public static fromJSON(json: PorjectJSON, projectType: ProjectType) {
    const project = new CodeProject(json.name, projectType)
    project.version = json.version
    project.root = FileTreeNode.FromJSON(json.fileTree)
    project.projectBuildUrl = json.projectBuildUrl
    return project
  }

  setBuildUrl(url: string) {
    this.projectBuildUrl = url
  }

  getBuildUrl() {
    return this.projectBuildUrl
  }
}