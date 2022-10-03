import { RefObject, useEffect, useRef, useState } from "react"
import { Rect } from "@drag/meta"

export const useBound = (): [Rect, RefObject<HTMLDivElement>] => {
  const [rect, setRect] = useState(Rect.ZERO)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(ref.current) {
      const r = ref.current.getBoundingClientRect()
      const bound = new Rect(
        Math.round(r.left),
        Math.round(r.top),
        Math.round(r.width),
        Math.round(r.height)
      )
      setRect(bound)
    }
  }, [])

  return [rect, ref]
}