import { ComponentMeta, Node, Page } from "../../meta";
import { StateMachine } from "../../utils";

export enum UIStates{
  Start,
  StartAdd,
  Adding,
  Added,
  Selected,
  Moving,
  Moved,
  StartResize,
  Resizing,
  Resized
}

export enum UIEvents {
  AUTO,
  EvtStartDragAdd,
  EvtAddDraging,
  EvtDrop,
  EvtMoving,
  EvtSelected,
  EvtCancelSelect,
  EvtNodeMoved,
  EvtNodeSyncMoving,
  EvtStartResize
}

export class UIModel extends StateMachine<UIStates, UIEvents> {

  dropComponentMeta: ComponentMeta | null = null
  dropComponentPosition: [number, number] = [0, 0]
  page: Page
  uiNode: Node | null = null

  constructor(){
    super(UIStates.Start)

    this.describeDragNewElement()
    this.page = new Page()
  }

  // 这里处理拖拽新元素逻辑
  private describeDragNewElement() {
    this.register(UIStates.Start, UIStates.StartAdd, UIEvents.EvtStartDragAdd, (meta: ComponentMeta) => {
      this.dropComponentMeta = meta
    })

    this.register(UIStates.StartAdd, UIStates.Adding, UIEvents.EvtAddDraging, (position) => {
      this.dropComponentPosition = position
      console.log("drag moving")
    })

    this.register(UIStates.Adding, UIStates.Added, UIEvents.EvtDrop, () => {
      const position = this.dropComponentPosition
      // console.log("🚀 ~ file: UIModel.ts ~ line 54 ~ UIModel ~ this.register ~ position", position)
      const node = this.page.createFromMetaNew(this.dropComponentMeta!)
      console.log("🚀 ~ file: UIModel.ts ~ line 58 ~ UIModel ~ this.register ~ node", node)
      // root的构造node的过程再外面实现一下
      this.uiNode = node
    })

    this.register(UIStates.Added, UIStates.Start, UIEvents.AUTO, () => {
    })
  }

  public getPosition() {
    return this.dropComponentPosition
  }

  public getNode() {
    return this.uiNode
  }
}