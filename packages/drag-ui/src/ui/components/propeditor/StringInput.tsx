import { Input } from "antd"
import { useState } from "react"
import { PropComponentProps } from "./propeditor.types"

export const StringInput = ({ disabled, onChange, propValue, metaProps }: PropComponentProps) => {

  const [value, setValue] = useState<string>()

  return (
    <Input
      {...metaProps}
      value={value || propValue}
      onChange={e => {
        const value = e.target.value
        setValue(value)
        onChange(value)
      }}
    />
  )
}