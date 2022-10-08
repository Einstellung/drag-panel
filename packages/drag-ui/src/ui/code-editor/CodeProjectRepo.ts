import axios from "axios";
import { CodeProject } from "@drag/code-model";
import svcURLConfig from "@drag/svc-config";

export async function updateContent(project: CodeProject) {
  let updated = false

  for(let up of project.getRoot().find(x => x.isDirty())) {
    console.log("update file ", up.getFileName())
    const { data } = await axios.post(svcURLConfig.codeProjectUploadOSS, {
      fileName: `${project.getType()}/${up.getFileName()}`,
      fileContent: up.getContent()
    })
    up.setUrl(data.url)
    up.saved()

    updated = true
  }

  if(updated) {
    project.increVer()

    await axios.post("http://localhost:4003/code-project", {
      projectName: project.getName(),
      projectDetail: project.toJSON()
    })
  }
}