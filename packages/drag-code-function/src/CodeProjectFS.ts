import axios from "axios"
import * as fs from "fs"
import path from "path"
import { CodeProject, FileTreeNode, PorjectJSON, ProjectType } from "@drag/code-model"
import fetch from "node-fetch"
import svcURLConfig from "@drag/svc-config"

export class CodeProjectFS {
  constructor(private cwd: string) {
  }

  private createFileNode(cwd: string, name: string) {
    const files = fs.readdirSync(cwd)
    const fNode = new FileTreeNode("dir", name)

    for(let file of files) {
      const fullPath = path.resolve(cwd, file)
      if(fs.statSync(fullPath).isDirectory()) {
        fNode.add(this.createFileNode(fullPath, file))
      } else {
        const fileNode = new FileTreeNode("file", file)
        fileNode.setContent(fs.readFileSync(fullPath, "utf-8"))
        fNode.add(fileNode)
      }
    }
    return fNode
  }

  public async upload(project: CodeProject) {
    const fNode = this.createFileNode(this.cwd, "")
    
    const shouldUpdate = [...fNode.find(x => x.isDirty())]
    console.info(`found ${shouldUpdate.length} should update: ${project.getType()}`)

    for(let file of shouldUpdate) {
      const { data } = await axios.post(svcURLConfig.codeProjectUploadOSS, {
        fileName: `${project.getType()}/${file.getFileName()}`,
        fileContent: file.getContent()
      })
      file.setUrl(data.url)
    }

    project.setRoot(fNode)
    const json = project.toJSON()

    try {
      const val = await axios.post("http://localhost:4003/code-project", {
        projectName: project.getName(),
        projectDetail: json
      })
    } catch(e) {
      console.log(e)
    }

    console.info("upload finish")
  }

  private async downloadFile(cwd: string, node: FileTreeNode) {
    if(node.getType() === "dir") {
      if(fs.existsSync(path.resolve(cwd, node.getFileName()))) {
        fs.rmdirSync(path.resolve(cwd, node.getFileName()), {
          recursive: true
        })
      }
      fs.mkdirSync(path.resolve(cwd, node.getFileName()))
      
      for(let child of node.getChildren()) {
        await this.downloadFile(path.resolve(cwd, node.getFileName()), child)
      }
    }

    const url = node.getUrl()
    if(url) {
      const resp = await fetch(url)
      const content = await resp.text()
      node.setContent(content)
      node.saved()

      fs.writeFileSync(
        path.resolve(cwd, node.getFileName()),
        content,
        "utf-8"
      )
    }
  }

  public async download(projectName: string) {
    console.log("download file", projectName)
    const { data } = await axios.get(`http://localhost:4003/code-project/${projectName}`)

    const json: PorjectJSON = data.result
    const project = CodeProject.fromJSON(json)

    await this.downloadFile(this.cwd, project.getRoot())
    return project
  }


  public static async createTemplates() {
    for (let key in CodeProject.TemplateNames) {
      const templateName = CodeProject.TemplateNames[key]

      const project = new CodeProject(key, key as ProjectType)
      const fs = new CodeProjectFS(
        path.resolve(__dirname, "../template/", key)
      )

      await fs.upload(project)
    }
  }
}