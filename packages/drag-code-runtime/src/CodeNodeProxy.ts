import { CodeEventType, Node, Topic } from "@drag/meta"
import { CodeEventHandler, CodeRunntime } from "./types"

export class CodeNodeProxy {
  private node: Node
  // node可以发送响应的事件集合
  private events: Record<string, Array<CodeEventHandler>>

  constructor(node: Node) {
    this.node = node
    this.events = {}

    this.node.on(Topic.ExternalEventNotify)
      .subscribe((evt: CodeRunntime) => {
        if(this.events[evt.type]) {
          this.events[evt.type].forEach(h => {
            h(evt)
          })
        }
      })
  }

  on(eventName: CodeEventType, handler: CodeEventHandler) {
    let topic = this.events[eventName]
    if(!topic) {
      topic = this.events[eventName] = []
    }
    topic.push(handler)

    return () => {
      this.events[eventName] = this.events[eventName].filter(h => h !== handler)
    }
  }

  // 设置node节点缓存数据
  memory(data: any) {
    this.node.setMemory(data)
  }
}