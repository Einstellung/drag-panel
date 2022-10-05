import { FileTreeNode } from "./FileTreeNode"
import { PorjectJSON } from "./types"

export class CodeProject {

  private version: number
  private root: FileTreeNode
  private projectName: string

  constructor(projectName: string) {
    this.projectName = projectName
    this.root = new FileTreeNode("dir", "root")
    this.version = 0
  }

  public getName() {
    return this.projectName
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
    const project = new CodeProject(json.name)
    project.version = json.version
    project.root = FileTreeNode.FromJSON(json.fileTree)
    return project
  }
}