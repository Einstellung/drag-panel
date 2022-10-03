import { CordNew, Rect } from "@drag/meta"
import { usePage, NodeRender, RenderContext } from "../../render"
import { TitleBar } from "../components/frame/TitleBar"
import classes from "./ui.module.scss"

export const Preview = () => {

  const page = usePage()
  if(!page) return null

  return (
    <div>
      <TitleBar />
      <div className={classes['preview-container']}>
        <RenderContext.Provider value={{
          cord: new CordNew(Rect.ZERO)
        }}>
          <NodeRender node={page.getRoot()}/>
        </RenderContext.Provider>
      </div>
    </div>
  )
}