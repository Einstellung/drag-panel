export enum Topic {

  RemoteComponentsLoaded,
  EditMode,
  PropertyModelUpdated,
  // New Event System
  Resized,
  PropertyChanged,
  GeneralMovingEvent,
  NewNodeAdded,
  NodeMoved,
  NodeChildrenChanged,
  SelectionChanged,
  AssistLinesChanged,
  MouseUpEventPass,
  MouseMoveEventPass,
  MouseDownEventPass,
  NodePropUpdated,
  
  NodeGapIndexChanged, // 仅仅用于制作Flex布局拖拽的阴影

  ShadowReceiverChanged,

  // 一些通用的语义
  Initialize,
  Loaded,
  ContextMessage,

  // runtime
  ExternalEventNotify,
  MemorizedDataChanged,
}