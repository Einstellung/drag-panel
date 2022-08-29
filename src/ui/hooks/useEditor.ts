import { useEffect } from "react"
import { ComponentsLoader } from "../../loader"

export const useEditor = () => {
  useEffect(() => {
    console.log("我执行了")
    ComponentsLoader.get().load()
  }, [])
}