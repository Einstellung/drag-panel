import { ComponentsLoader } from "../../loader";
import { ComponentMeta, JsonPage, Node, Page, Rect, Topic } from "../../meta";
import { StateMachine } from "../../utils";
import { NodeSelector } from "./NodeSelector";
import { PropertyEditor } from "./PropertyEditor";
import { ResizerNew } from "./Resizer.new";
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
  propertyEditor: PropertyEditor

  constructor(json: JsonPage){
    super(UIStates.Start)

    this.describeDragNewElement()
    this.describeSelected()
    this.describeDragMove()
    this.describeResizeNode()
    this.page = new Page(json, ComponentsLoader.get())
    // this.selection = new SelectionNew()
    this.selection = null
    this.root = this.page.getRoot()
    this.propertyEditor = new PropertyEditor(this) // this即实例化对象
  }

  // 处理拖拽新元素逻辑
  private describeDragNewElement() {
    this.register([UIStates.Start, UIStates.Selected], UIStates.StartAdd, UIEvents.EvtStartDragAdd, (meta: ComponentMeta) => {
      console.log("[State StartAdd]")
      this.dropComponentMeta = meta
    })

    this.register([UIStates.StartAdd, UIStates.Adding], UIStates.Adding, UIEvents.EvtAddDraging, (worldPosition) => {
      console.log("[State Adding]")
      this.dropComponentPosition = worldPosition
      // 如果只是单纯的receiver，因为是root节点其实不需要去做比较？？
      const receiver = NodeSelector.selectForDrop(this.root, worldPosition, null)
      this.emit(Topic.ShadowReceiverChanged, receiver)
    })

    this.register(UIStates.Adding, UIStates.Added, UIEvents.EvtDrop, () => {
      console.log("[State Added]")
      const worldPosition = this.dropComponentPosition
      console.log("[UIModel worldPosition]", worldPosition)
      const node = this.page.createFromMetaNew(this.dropComponentMeta!)
      const receiver = NodeSelector.selectForDrop(this.root, worldPosition, null)

      receiver?.addToAbsolute(node, worldPosition)
      this.dropComponentMeta = null
      receiver?.emit(Topic.NewNodeAdded)
      this.selection = node
    })

    this.register(UIStates.Added, UIStates.Selected, UIEvents.AUTO, () => {
      console.log("[State Selected]")
    })
  }

  // 处理选中逻辑
  private describeSelected() {
    this.register([UIStates.Start, UIStates.Selected], UIStates.Selected, UIEvents.EvtSelected, (node: Node) => {
      console.log("[State Seleted]")
      
      this.selection = node
      console.log("select trigger")
      // 下面暂时不用，后面切换显示的时候有得用
      this.emit(Topic.SelectionChanged)
    })
    this.register(UIStates.Selected, UIStates.Start, UIEvents.EvtCancelSelect, () => {
      console.log("[State Start]")
      console.log("cancel select trigger")
    })
  }

  // 处理拖拽的逻辑
  private describeDragMove() {
    this.register([UIStates.Selected, UIStates.Moving], UIStates.Moving, UIEvents.EvtNodeSyncMoving, 
      (node: Node, vec: [number, number]) => {
        // todo!!(Flex)
        console.log("[State Moving]")
    })

    this.register([UIStates.Start, UIStates.Selected, UIStates.Moving], UIStates.Moved, UIEvents.EvtNodeMoved, 
      (node: Node, vec: [number, number]) => {
        console.log("[State Moved]")
        node.setXYByVec(vec)
        node.emit(Topic.NodeMoved) // 刷新节点更新node位置
        this.emit(Topic.NodeMoved) // 提醒属性编辑器更新数据
    })

    this.register(UIStates.Moved, UIStates.Selected, UIEvents.AUTO, () => {
    })
  }

  // 处理调整大小逻辑
  private describeResizeNode() {
    let resizeNode: Node | null = null
    let startRect: Rect | null = null
    let resizer: ResizerNew | null = null
    let vecStart: [number, number] = [0, 0]

    this.register(UIStates.Selected, UIStates.StartResize, UIEvents.EvtStartResize, 
      (cubeType: number, clientVec: [number, number], node: Node) => {
        console.log("[State StartResize]")
        resizeNode = node
        resizer = new ResizerNew(cubeType)
        startRect = node.absMountPointRect()
        vecStart = clientVec
    })

    this.register([UIStates.StartResize, UIStates.Resizing], UIStates.Resizing, UIEvents.EvtMoving, 
      (vecClient: [number, number]) => {
        const vec = [vecClient[0] - vecStart[0], vecClient[1] - vecStart[1]] as [number, number]
        console.log("[State Resizing]")

        if(resizeNode) {
          const nextRect = resizer!.nextRect(startRect!, vec)

          const parentRect = resizeNode.getParent().absMountPointRect()

          resizeNode.setXYWH(
            nextRect.left - parentRect.left,
            nextRect.top - parentRect.top,
            nextRect.width,
            nextRect.height
          )

          // 通知UI刷新页面
          resizeNode.emit(Topic.Resized)
        }
    })

    this.register(UIStates.Resizing, UIStates.Resized, UIEvents.EvtDrop, () => {
      console.log("[State Resized]")
      resizeNode = null
    })

    this.register(UIStates.Resized, UIStates.Selected, UIEvents.AUTO, () => {
      console.log("[State Selected]")
      // todo!! may be we should emit something
    }) 
  }

  public getPosition() {
    return this.dropComponentPosition
  }

  public getRoot() {
    return this.root
  }
}