import { CordNew } from "./Cord.new"
import { Node } from "./Node"
import { Rect } from "./Rect"

/** 挂载点一般是该元素的父级元素HTML */
export class MountPoint {
  
  constructor(
    private ele: HTMLElement,
    private node: Node,
    /** 根节点cord？ */
    private cord: CordNew
  ) {}

  /**
   * 返回挂载点Rect，其值为相对父节点偏移值
   * 对根节点设置其[left, top]=0，即偏移值为0
   */
  getDiffRect() {
    const rect = this.ele.getBoundingClientRect()
    const parent = this.node.getParent()
    if(parent && parent.getMountPoint()) {
      const [x, y] = this.positionDiff(parent)
      return new Rect(
        Math.round(x),
        Math.round(y),
        Math.round(rect.width),
        Math.round(rect.height)
      )
    }
    return new Rect(
      Math.round(0),
      Math.round(0),
      Math.round(rect.width),
      Math.round(rect.height)
    )
  }

  /** 子节点相对父节点[left, top]偏移值 */
  positionDiff(parentNode: Node) {
    // const thisRect = this.ele.getBoundingClientRect()

    const parentEle = parentNode.getMountPoint()!.ele
    const parentRect = parentEle.getBoundingClientRect()

    if(!parentRect) {
      throw new Error("You cannot call positiondiff on unmounted node.")
    }

    const childRect = parentEle.children[0].getBoundingClientRect()

    // 子元素相对父元素偏移值
    const dx = childRect.left - parentRect.left
    const dy = childRect.top - parentRect.top

    return [dx, dy]
  }

  /** 挂载点[worldX, worldY] */
  getAbsPosition() : Array<number>  {
		const rect = this.ele.getBoundingClientRect()
		const cord = this.cord
		if(!cord) {
			throw new Error(`Page is not initialized to node ${this.node.getId()}.`)
		}
		const left = Math.round(rect.left + cord.scrollX - cord.viewport.left)
		const top = Math.round(rect.top+ cord.scrollY - cord.viewport.top)
		return [left, top]
	}
}