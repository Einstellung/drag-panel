import { useEffect, useMemo, useState } from "react"
import { ComponentsLoader } from "@drag/loader"
import { JsonPage } from "@drag/meta"
import { UIModel } from "../object/UIModel"

const json: JsonPage = {
  page: {
    type: "react",
    name: "page",
    group: "container",
    box: {
      left: (3200 - 414) / 2, // 1393
      top: 40,
      width: 414,
      height: 736
    },
    children: [],
    style: {
      border: "1px solid #eee",
      backgroundColor: "white"
    }
  }
}

export const useEditor = () => {
  const editor = useMemo(() => new UIModel(json), [])

  useEffect(() => {
    ComponentsLoader.get().load()
  }, [])

  return editor
}