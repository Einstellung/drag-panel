import { useEffect, useMemo, useState } from "react"
import { ComponentsLoader } from "../../loader"
import { UIModel } from "../object/UIModel"

export const useEditor = () => {
  const editor = useMemo(() => new UIModel(), [])

  useEffect(() => {
    ComponentsLoader.get().load()
  }, [])

  return editor
}