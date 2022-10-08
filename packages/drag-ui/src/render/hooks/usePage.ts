import { useEffect, useState } from "react"
import { ComponentsLoader } from "@drag/loader"
import { JsonPage, Page } from "@drag/meta"

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
function useScript(text: string, ctx: any) {

}

export const usePage = () => {
  const [page, setPage] = useState<Page | null>(null)

  useEffect(() => {
    
    function loadPage() {
      const json = sessionStorage.getItem("DragModel")
      if (json === null) return

      const data: JsonPage = JSON.parse(json)
      const page = new Page(data, ComponentsLoader.get())
      setPage(page)
    }

    loadPage()
  }, [sessionStorage.getItem("DragModel")])

  return page
}