import { useEffect, useState } from "react";
import { Node, Topic } from "../../meta";

export const useListenChildrenUpdate = (node: Node) => {
  const [ver, setVer] = useState(0)

  useEffect(() => {
    console.log("此处我被执行了")
    console.log("listener node val is ", node)
    const sub = node.on(Topic.NewNodeAdded)
      .subscribe(() => {
        setVer(x => x + 1)
        console.log("ver value is ", ver)
      })

    return () => {
      sub.unsubscribe()
    }
  }, [])
}