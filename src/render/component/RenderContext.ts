import { createContext } from "react";
import { Rect, CordNew } from "../../meta";

export const RenderContext = createContext<{
  cord: CordNew
}>({
  /** 绑定panel处的cord */
  cord: new CordNew(Rect.ZERO)
})