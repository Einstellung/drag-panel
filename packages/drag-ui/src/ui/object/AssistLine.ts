import { Node, Rect } from "@drag/meta"

export interface LineDescriptor {
  dir: 0 | 1 // 0 - 水平 1 - 垂直
  type: 0 | 1 // 0-居中对齐线  1: 两侧对齐线
  pos: number
  distance: number
}

export class AssistLine {
  calculateLines(nodeRect: Rect, node: Node) {
    let lines: Array<LineDescriptor> = []
    const parent = node.getParent()

    if(parent) {
      // 0 : 水平线  1：垂直线
      const parentRect = parent.absMountPointRect()

      lines.push({
        dir: 0,
        type: 0,
        pos: parentRect.centerY(),
        distance: Math.abs(nodeRect.centerY() - parentRect.centerY())
      })

      lines.push({
        dir: 1,
        type: 0,
        pos: parentRect.centerX(),
        distance: Math.abs(nodeRect.centerX() - parentRect.centerX())
      })
    }

    return lines
  }
}