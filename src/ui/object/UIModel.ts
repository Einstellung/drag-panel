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

  private dropComponentMeta: ComponentMeta | null = null
  private dropComponentPosition: [number, number] = [0, 0]
  page: Page
  /** page root */
  root: Node
  /** 现在选择的节点 */
  selection: Node | null

  constructor(json: JsonPage){
    super(UIStates.Start)

    this.describeDragNewElement()
    this.describeSelected()
    this.describeDragMove()
    this.page = new Page(json, ComponentsLoader.get())
    // this.selection = new SelectionNew()
    this.selection = null
    this.root = this.page.getRoot()
  }

  // 这里处理拖拽新元素逻辑
  private describeDragNewElement() {
    this.register(UIStates.Start, UIStates.StartAdd, UIEvents.EvtStartDragAdd, (meta: ComponentMeta) => {
      this.dropComponentMeta = meta
    })

    this.register(UIStates.StartAdd, UIStates.Adding, UIEvents.EvtAddDraging, (worldPosition) => {
      this.dropComponentPosition = worldPosition
      // 如果只是单纯的receiver，因为是root节点其实不需要去做比较？？
      const receiver = NodeSelector.selectForDrop(this.root, worldPosition, null)
      this.emit(Topic.ShadowReceiverChanged, receiver)
    })

    this.register(UIStates.Adding, UIStates.Added, UIEvents.EvtDrop, () => {
      const worldPosition = this.dropComponentPosition
      console.log("[UIModel worldPosition]", worldPosition)
      const node = this.page.createFromMetaNew(this.dropComponentMeta!)
      const receiver = NodeSelector.selectForDrop(this.root, worldPosition, null)

      receiver?.addToAbsolute(node, worldPosition)
      this.dropComponentMeta = null
      receiver?.emit(Topic.NewNodeAdded)
      this.selection = node
    })

    this.register(UIStates.Added, UIStates.Start, UIEvents.AUTO, () => {
    })
  }

  // 处理选中逻辑
  private describeSelected() {
    this.register([UIStates.Start, UIStates.Selected], UIStates.Selected, UIEvents.EvtSelected, (node: Node) => {
      
    })
  }

  // 处理拖拽的逻辑
  private describeDragMove() {
    this.register([UIStates.Start, UIStates.Moved], UIStates.Moved, UIEvents.EvtNodeMoved, (node: Node, vec: [number, number]) => {
      
      node.setXYByVec(vec)
      node.emit(Topic.NodeMoved)
    })
  }

  public getPosition() {
    return this.dropComponentPosition
  }

  public getRoot() {
    return this.root
  }
}