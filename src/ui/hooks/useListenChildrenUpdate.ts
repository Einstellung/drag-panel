import { useEffect, useState } from "react";
import { Node, Topic } from "../../meta";

/** 似乎目前这个hook没什么用!! */
export const useListenChildrenUpdate = (node: Node) => {
  const [ver, setVer] = useState(0)
  useEffect(() => {
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