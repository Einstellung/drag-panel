import { useEffect, useState } from "react";
import { Node, Topic } from "@drag/meta";

/** 用于触发page root等这样的这样的容器节点渲染数据，当新节点被添加的时候，UIModel会
 * 告知容器节点，容器节点执行bridge.render来渲染页面
 */
export const useListenChildrenUpdate = (node: Node) => {
  const [ver, setVer] = useState(0)
  useEffect(() => {
    const sub = node.on(Topic.NewNodeAdded)
      .subscribe(() => {
        setVer(x => x + 1)
        console.log("useListenChildrenUpdate trigger ", node, ver)
      })

    return () => {
      sub.unsubscribe()
    }
  }, [])
}