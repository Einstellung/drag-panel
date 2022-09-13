import { Rect } from "../../meta";

/** 缩放节点 */
export class ResizerNew {
  constructor(
    private cubeType: number
  ){}

  static resizerData = [
    ["topleft", 1, [1, 1, -1, -1]],
    ["topmiddle", 2, [0, 1, 0, -1]],
    ["topright", 3, [0, 1, 1, -1]],
    ["middleright", 4, [0, 0, 1, 0]],
    ["bottomright", 5, [0, 0, 1, 1]],
    ["bottommiddle", 6, [0, 0, 0, 1]],
    ["bottomleft", 7, [1, 0, -1, 1]],
    ["middleleft", 8, [1, 0, -1, 0]],
  ]

  /**
   * 返回缩放后的rect
   * @param rect node挂载点rect
   * @param vec 变化向量
   */
  nextRect(rect: Rect, vec: [number, number]) {
    const type = this.cubeType - 1
    const nvec = ResizerNew.resizerData[type][2] as number[]

    const [dx, dy] = vec
    // 有的时候缩放时left是不会变化的，所以做限制
    const vec4 = [
      nvec[0] * dx,
      nvec[1] * dy,
      nvec[2] * dx,
      nvec[3] * dy
    ]

    // vec是向量，自带方向，只用加就可以
    const left = vec4[0] + rect.left
    const top = vec4[1] + rect.top
    const width = vec4[2] + rect.width
    const height = vec4[3] + rect.height

    return new Rect(left, top, width, height)
  }
}