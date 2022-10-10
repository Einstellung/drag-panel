import { useEffect, useRef, useState } from "react"
import { ComponentsLoader } from "@drag/loader"
import { JsonPage, Page } from "@drag/meta"
import { loadProject } from "@drag/code-model"
import axios from "axios"
import { CodeContext } from "@drag/code-runtime"

const json: JsonPage = {
  page: {
    type: "react",
    name: "page",
    group: "container",
    box: {
      left: (3200 - 414) / 2,
      top: 40,
      width: 414,
      height: 736,
    },
    children: [],
    style: {
      border: "1px solid #eee",
      backgroundColor: "white",
    },
  }
}

/** 将codeless脚本代码注入到preview页面中 */
function runScript(code: string, ctx: any) {
  function define(deps: any, callback: (...deps: any[]) => Function ) {
    if(!callback) {
      callback = deps
      deps = []
    }

    const r = callback()
    r(ctx)
  }

  return eval(code)
}

export const usePage = () => {
  const [page, setPage] = useState<Page | null>(null)

  const ctx = useRef<CodeContext | null>(null)

  async function run() {
    try {
      const project = await loadProject("codeless")
      const buildUrl = project.getBuildUrl()

      if(buildUrl && page) {
        const result = await axios.get(buildUrl)
        const content = result.data

        ctx.current = new CodeContext(page)
        runScript(content, ctx.current)
      }
      
    } catch(e) {
      console.error(e)
    }
  }

  if(sessionStorage.getItem("DragModel")) {
    run()
  }

  useEffect(() => {
    
    async function loadPage() {
      const json = sessionStorage.getItem("DragModel")
      if (json === null) return

      const data: JsonPage = JSON.parse(json)
      const page = new Page(data, ComponentsLoader.get())
      setPage(page)
      // await run()
    }

    loadPage()
  }, [sessionStorage.getItem("DragModel")])

  return page
}