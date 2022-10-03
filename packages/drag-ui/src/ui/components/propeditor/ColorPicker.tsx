import { useState } from "react"
import { SketchPicker } from "react-color"
import { Mask } from "./Mask"
import classes from "./prop-editor.module.scss"

export const ColorPicker = ({ onChange, defaultValue, disabled }: {
  onChange: (value: string) => void,
  defaultValue: string,
  disabled: boolean
}) => {

  // 0 - 折叠
  // 1 - 展开
  const [state, setState] = useState(0)
  const [color, setColor] = useState(defaultValue)

  return (
    <div className={classes['color-picker']}>
      <div
        onClick={() => {
          setState(x => 1 - x)
        }}
        style={{
          width: 20,
          height: 20,
          backgroundColor: color,
        }}
      />
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
                onChange(x.hex)
              }}
            />
          </Mask>
        )
      }
    </div>
  )
}