import axios from "axios";
import { CodeProject, FileTreeNode, PorjectJSON } from "@drag/code-model";
import { debounce, Emiter, Topic } from "@drag/utils";
import { updateContent } from "./CodeProjectRepo";

function first<T>(it: Iterator<T>): T | null {
  let next = it.next()
  if(next.value) {
    return next.value
  }
  return null
}

export class ProjectEditorInst extends Emiter<1>{
  private project: CodeProject

  constructor(projectName: string) {
    super()
    // this.project = mockProject()
    this.project = new CodeProject(projectName)
    this.download()
  }

  public getProject() {
    return this.project
  }

  public getSelectedFileContent(fileName: string) {
    const fileGenerator = this.project.getRoot().find(x => x.getType() === "file" && 
      x.getFileName() === fileName)
    const content = first(fileGenerator)?.getContent()
    return content || ""
  }

  public setSelectedFileContent(fileName: string, content: string) {
    const fileGenerator = this.project.getRoot().find(x => x.getType() === "file" && 
    x.getFileName() === fileName)
    first(fileGenerator)?.setContent(content)
  }

  public async debounceSaveContent() {
    const debonceSave = debounce(updateContent, 1000)
    await debonceSave(this.project)
  }

  private async download() {
    const { data } = await axios.get(`http://localhost:4003/code-project/${this.project.getName()}`)

    const json: PorjectJSON = data.result
    this.project = CodeProject.fromJSON(json)

    const files = [...this.project.getRoot().find(x => x.getType() === "file")]
      .filter(x => x.getUrl())

    await Promise.all(files.map(file => {
      const url = file.getUrl()!
      return fetch(url)
        .then(resp => resp.text())
        .then(content => {
          file.setContent(content)
          file.saved()
        })
    }))

    // todo!!
    // this.emit(Topic.Loaded)
  }
}

function mockProject() {
  const root = FileTreeNode.FromJSON({
    type : "dir",
    fileName : 'root', 
    url : "",
    children : [{
      type : "dir",
      fileName : 'src',
      url : '',
      children : [{
        type : "file",
        fileName : 'index.ts',
        url : ''
      }]
    }, {
      type : 'file',
      fileName : 'package.json',
      url : ''
    }]    
  })
  const project = new CodeProject("mockFile")
  project.setRoot(root)
  return project
}