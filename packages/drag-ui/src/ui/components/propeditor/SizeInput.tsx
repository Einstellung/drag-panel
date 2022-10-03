import { PropComponentProps } from "./propeditor.types"
import { Input, Select } from "antd"
import classes from "./prop-editor.module.scss"
import { SizeUnit } from "@drag/meta"
import { useState } from "react"

export const SizeInput = ({
  propValue,
  disabled,
  onChange,
  metaProps
}: PropComponentProps) => {

  const sizeUnit: SizeUnit = propValue

  const [value, setValue] = useState(sizeUnit.getValue())
  const [unit, setUnit] = useState(sizeUnit.getUnit())
  const [mode, setMode] = useState(sizeUnit.getMode())

  return (
    <div className={classes['size-input']}>
      <label style={{width: "40px"}}>
        {metaProps.suffix}: {" "}
      </label>
      <Input
        disabled={disabled}
        value={value}
        style={{ width: "60px"}}
        onChange={e => {
          const value = Number.parseInt(e.target.value)
          if(isNaN(value)) return
          setValue(value)
          sizeUnit.setValue(value)
          onChange(sizeUnit)
        }}
      />
      <span style={{width: "10px"}}></span>
      <Select
        value={unit}
        onChange={unit => {
          setUnit(unit)
          sizeUnit.setUnit(unit)
          onChange(sizeUnit)
        }}
      >
        <Select.Option value="px">px</Select.Option>
        <Select.Option value="%">%</Select.Option>
      </Select>
      <span style={{width: "10px"}}></span>
      <span>mode</span>
      <Select
        value={mode}
        onChange={mode => {
          setMode(mode)
          sizeUnit.setMode(mode)
          onChange(sizeUnit)
        }}
      >
        <Select.Option value="auto">auto</Select.Option>
        <Select.Option value="fill">fill</Select.Option>
        <Select.Option value="fixed">fixed</Select.Option>
        <Select.Option value="value">value</Select.Option>
      </Select>
    </div>
  )
}