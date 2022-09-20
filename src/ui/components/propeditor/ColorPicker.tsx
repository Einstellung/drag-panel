import { useState } from "react"
import { SketchPicker } from "react-color"
import { Mask } from "./Mask"

export const ColorPicker = () => {

  // 0 - 折叠
  // 1 - 展开
  const [state, setState] = useState(0)
  const [color, setColor] = useState("#393161")

  return (
    <div className="color-picker">
      <div
        onClick={() => {
          setState(x => 1 - x)
        }}
        style={{
          width: 20,
          height: 20,
          backgroundColor: color,
        }}
      >
        {
          state === 1 && (
            <Mask
              onClick={() => { setState(0)}}
              display={state === 1}
            >
              <SketchPicker
                color={color}
                onChangeComplete={x => {
                  setColor(x.hex)
                }}
              />
            </Mask>
          )
        }
      </div>
    </div>
  )
}