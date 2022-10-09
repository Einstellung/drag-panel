import { ProjectType, updateContent } from "@drag/code-model";
import { CodeProjectFS } from "./CodeProjectFS";
import { RollupPackager } from "./rollup/RollupPackager";
import fs from "fs"
import path from "path";
import axios from "axios";
import svcURLConfig from "@drag/svc-config"

export class ProjectBuilder {
  async build(typeName: string, cwd: string) {
    const projectFS = new CodeProjectFS(cwd)
    const project = await projectFS.download(typeName)

    console.log("[project downloaded dir]", cwd)

    switch(project.getType() as ProjectType | "undefined") {
      case "codeless" :
        const rollup = new RollupPackager(cwd)

        await rollup.build()

        const uploadFile = fs.readFileSync(path.resolve(cwd, "build/index.js"), "utf-8")
        const uploadResult = await axios.post(svcURLConfig.codeProjectUploadOSS, {
          fileName: "codeless-build.js",
          fileContent: uploadFile
        })

        project.setBuildUrl(uploadResult.data.url)
        await updateContent(project)
        break

      case "faas":
        break
      case "undefined":
        throw new Error(`type ${project.getType()} not supported`)
    }
  }
}