import { Rect } from "./Rect"

export class CordNew {
  /** 可视窗口区域的rect */
  viewport: Rect
  stage: Rect
  scrollX: number
  scrollY: number

  constructor(stage: Rect) {
    this.scrollX = 0
    this.scrollY = 0
    this.viewport = Rect.ZERO
    this.stage = stage
  }

  /** viewport.left和top始终是0，所以返回的是clientX实际坐标 */
  worldX(clientX: number) {
    return Math.round(clientX + this.scrollX - this.viewport.left)
  }

  worldY(clientY: number) {
    return Math.round(clientY + this.scrollY - this.viewport.top)
  }

  setViewPort(rect: Rect) {
    this.viewport = rect
  }

  updateScroll(scrollX: number, scrollY: number) {
    this.scrollX = Math.round(scrollX)
    this.scrollY = Math.round(scrollY)
  }
}