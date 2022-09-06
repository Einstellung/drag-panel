import { ComponentsLoader } from "../../loader";
import { ComponentMeta, JsonPage, Node, Page, Topic } from "../../meta";
import { StateMachine } from "../../utils";
import { NodeSelector } from "./NodeSelector";
import { SelectionNew } from "./SelectionNew";

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

export class UIModel extends StateMachine<UIStates, UIEvents, Topic> {

  dropComponentMeta: ComponentMeta | null = null
  dropComponentPosition: [number, number] = [0, 0]
  page: Page
  /** page root */
  root: Node
  /** 现在选择的节点 */
  selection: SelectionNew

  constructor(json: JsonPage){
    super(UIStates.Start)

    this.describeDragNewElement()
    this.page = new Page(json, ComponentsLoader.get())
    this.selection = new SelectionNew()
    this.root = this.page.getRoot()
  }

  // 这里处理拖拽新元素逻辑
  private describeDragNewElement() {
    this.register(UIStates.Start, UIStates.StartAdd, UIEvents.EvtStartDragAdd, (meta: ComponentMeta) => {
      this.dropComponentMeta = meta
    })

    this.register(UIStates.StartAdd, UIStates.Adding, UIEvents.EvtAddDraging, (position) => {
      this.dropComponentPosition = position
      // 如果只是单纯的receiver，因为是root节点其实不需要去做比较？？
      const receiver = NodeSelector.selectForDrop(this.root, position, null)
      this.emit(Topic.ShadowReceiverChanged, receiver)
    })

    this.register(UIStates.Adding, UIStates.Added, UIEvents.EvtDrop, () => {
      const position = this.dropComponentPosition
      const node = this.page.createFromMetaNew(this.dropComponentMeta!)
      console.log("🚀 ~ file: UIModel.ts ~ line 58 ~ UIModel ~ this.register ~ node", node)
      const receiver = NodeSelector.selectForDrop(this.root, position, null)
      receiver?.addToAbsolute(node)
      this.dropComponentMeta = null
      receiver?.emit(Topic.NewNodeAdded)
    })

    this.register(UIStates.Added, UIStates.Start, UIEvents.AUTO, () => {
    })
  }

  public getPosition() {
    return this.dropComponentPosition
  }

  public getRoot() {
    return this.root
  }
}