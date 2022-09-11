import { useEffect } from "react";
import { Subscription } from "rxjs";
import { Topic } from "../../meta";
import { Emiter } from "../../utils";

type SubscribeGroup = [emiter: Emiter<Topic>, topic: Topic | Topic[]]

// 用单纯的isArray判断不对，因为SubscribeGroup其实就是array了
function isGroupArray(group: SubscribeGroup | SubscribeGroup[]): group is SubscribeGroup[] {
  return !(group[0] as any).emit
}

export function useSubscribe(group: SubscribeGroup | SubscribeGroup[], callback: (...args: any[]) => any) {

  function createSub(group: SubscribeGroup) {
    const [emiter, topic] = group
    return emiter.on(topic)
    // subscribe是个函数，而不应立即执行，所以不能传入callback(...data)，如果传入callback，又没法传参数
    // 所以写成这种形式
      .subscribe((...data: any[]) => {
        callback(...data)
      })
  }

  useEffect(() => {
    const subs: Array<Subscription> = []
    if(isGroupArray(group)) {
      group.forEach(g => {
        subs.push(createSub(g))
      }) 
    } else {
      subs.push(createSub(group))
    }

    return () => {
      subs.forEach(sub => sub.unsubscribe())
    }
  }, [])
}