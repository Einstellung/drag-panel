import { Node } from "@drag/meta"

export class NodeSelector {

  /**
   * 返回可以被放置渲染的节点
   * @param container 
   * @param position 比较范围
   * @param exclude 被移除的节点
   */
  public static selectForDrop(
    container: Node,
    position: [number, number],
    exclude: Node | null
  ) {

    let node = NodeSelector.selectCheck(container, position, exclude)

    while(node && !node.isContainer()) {
      node = node.getParent()
    }
    if(node?.getParent() === null) {
      node = node.getChildren()[0]
    }

    return node
  }

  /**
   * 返回满足约束条件的节点
   * @param container 
   * @param position 比较范围
   * @param exclude 被移除的节点
   */
  private static selectCheck(
    container: Node,
    position: [number, number],
    exclude: Node | null
  ) : Node | null {
    const [x, y] = position
    if(!container.bound(x,y) || container === exclude) {
      return null
    }

    for(let child of container.getChildren()) {
      const nodeRect = container.getMountPointRect()
      const result = NodeSelector.selectCheck(child, [x - nodeRect.left, y - nodeRect.top], exclude)
      if(result) {
        return result
      }
    }

    return container
  }
}