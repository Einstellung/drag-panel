import { useContext } from "react"
import { LineDescriptor } from "../../object/AssistLine"
import { RenderContext } from "../render/RenderContext"

export interface AssistLineProps {
  lines: Array<LineDescriptor>,
  show: boolean
}

export const AssistLineSVG = ({lines, show}: AssistLineProps) => {

  const context = useContext(RenderContext)

  return (
    <svg className="assist-lines">
      {
        lines.map(line => {
          const style = {
            stroke: "black"
          }

          if(line.dir === 0) {
            const relativePos = Number(line.pos)
            return (
              <line
                style={style}
                x1="0"
                y1={relativePos - context.cord.scrollY}
                x2={context.cord.viewport.width}
                y2={relativePos - context.cord.scrollY}
              />
            )
          } else {
            const relativePos = Number(line.pos)
            return (
              <line
                style={style}
                x1={relativePos - context.cord.scrollX}
                y1={0}
                x2={relativePos - context.cord.scrollX}
                y2={context.cord.viewport.height}
              />
            )
          }
        })
      }
    </svg>
  )
}