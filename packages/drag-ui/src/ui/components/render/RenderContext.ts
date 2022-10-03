import { createContext } from "react";
import { CordNew, Rect } from "@drag/meta";
import { UIModel } from "../../object/UIModel";

export const RenderContext = createContext<{
  editor: UIModel | null,
  cord: CordNew
}>({
  editor: null,
  /** 绑定panel处的cord */
  cord: new CordNew(Rect.ZERO)
})