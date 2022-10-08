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

  constructor(projectName: string, projectType: ProjectType) {
    this.projectName = projectName
    this.root = new FileTreeNode("dir", "root")
    this.version = 0
    this.projectType = projectType
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
      version: this.version
    }
  }

  public static fromJSON(json: PorjectJSON) {
    const project = new CodeProject(json.name, "codeless")
    project.version = json.version
    project.root = FileTreeNode.FromJSON(json.fileTree)
    return project
  }
}