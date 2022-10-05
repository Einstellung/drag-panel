import { Express } from "express";
import path from "path";
import { CodeRunner } from "../../drag-code-function";
import { DocService } from "./serviceDoc";
import { uploadOSS } from "./serviceUpload";

export function router(app: Express) {
  app.post("/code-project", async (req, res) => {
    const { projectName, projectDetail } = req.body
    const docSvc = new DocService("code-project", { projectName })
    await docSvc.put(projectDetail)

    // const DocGetVal = await docSvc.get()
    // console.log("🚀 ~ file: router.ts ~ line 11 ~ app.post ~ DocGetVal", DocGetVal)
    // if(DocGetVal) {
    //   // @ts-ignore
    //   for(let val of DocGetVal.fileTree.children) {
    //     console.log("🚀 ~ file: router.ts ~ line 15 ~ app.post ~ val", val)
    //   }
    // }
  })

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
}