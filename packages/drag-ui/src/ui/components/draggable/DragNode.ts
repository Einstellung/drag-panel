export class DragNode {
  startX = 0
  startY = 0
  diffX = 0
  diffY = 0
  dragging = false

  update(e: MouseEvent) {
    this.diffX = e.clientX - this.startX
    this.diffY = e.clientY - this.startY
  }

  init() {
    this.diffX = 0
    this.diffY = 0
  }

  start(e: MouseEvent) {
    this.startX = e.clientX
    this.startY = e.clientY
  }
}