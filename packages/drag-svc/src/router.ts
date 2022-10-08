import { Express } from "express";
import path from "path";
import { CodeRunner, ProjectBuilder } from "@drag/code-function";
import { DocService } from "./serviceDoc";
import { uploadOSS } from "./serviceUpload";
import fs from "fs"

export function router(app: Express) {
  // 保存oss到数据库
  app.post("/code-project", async (req, res) => {
    const { projectName, projectDetail } = req.body
    const docSvc = new DocService("code-project", { projectName })
    await docSvc.put(projectDetail)

    const DocGetVal = await docSvc.get()
    res.send({
      result: DocGetVal
    })
    // console.log("🚀 ~ file: router.ts ~ line 11 ~ app.post ~ DocGetVal", DocGetVal)
    // if(DocGetVal) {
    //   // @ts-ignore
    //   for(let val of DocGetVal.fileTree.children) {
    //     console.log("🚀 ~ file: router.ts ~ line 15 ~ app.post ~ val", val)
    //   }
    // }
  })

  // 上传oss
  app.post("/code-project-update", async (req, res) => {
    const { fileName, fileContent } = req.body
    const { url } = await uploadOSS(fileName, fileContent)
    res.send({
      url
    })
  })

  app.get("/code-project/:projectName", async (req, res) => {
    const docSvc = new DocService("code-project", req.params)
    const result = await docSvc.get()
    console.log("🚀 ~ file: router.ts ~ line 36 ~ app.get ~ result", result)
    // @ts-ignore
    for (const r of result.fileTree.children) {
      console.log("🚀 ~ file: router.ts ~ line 39 ~ app.get ~ r", r)
    }
    res.send({
      result
    })
  })

  app.get("/faas/:page/:fn", async(req, res) => {
    const { page, fn } = req.params
    try {
      const runner = new CodeRunner(path.resolve(__dirname, "./tmp"), page)
      const result = runner.run(fn)
      res.send(result)
    } catch(e:any) {
      console.error(e)
      res.status(500).send(e.toString())
    }
  })

  // 对文件打包编译操作
  app.put("/build/:codeType", async (req, res) => {
    const codeType = req.params.codeType as "codeless" | "faas"

    const cwd = path.resolve(__dirname, "../tmp-build/codeless-build")
    console.log("start build...")

    if(!fs.existsSync(cwd)) {
      fs.mkdirSync(cwd)
    }

    const builder = new ProjectBuilder()
    await builder.build(codeType, cwd)
    res.send({
      success: true
    })

  })
}