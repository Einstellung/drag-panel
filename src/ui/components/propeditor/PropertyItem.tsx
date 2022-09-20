import { Select } from "antd"
import { useEffect, useState } from "react"
import { Topic } from "../../../meta"
import { PropItem } from "../../object/PropItem"
import { ColorPicker } from "./ColorPicker"
import { Integer } from "./Integer"
import { SizeInput } from "./SizeInput"
import { StringInput } from "./StringInput"


function render(type: string, props: any, key: any) {
  
  switch(type) {
    case "size":
      return <SizeInput key={key} {...props}/>
    case "name":
      return <StringInput />
    case "integer":
      return <Integer />
    case "color":
      return <ColorPicker
               key={key}
               />
    case "select":
      return (
        <h1>这是select</h1>
        // <Select>
        //   <h2>Selct Option</h2>
        // </Select>
      )
    case "font-family":
      return (
        <Select
          defaultValue={"Microsoft Yahei"}
        >
          <Select.Option value="Microsoft YaHei">微软雅黑</Select.Option>
          <Select.Option value="宋体">宋体</Select.Option>
          <Select.Option value="arial">Arial</Select.Option>
          <Select.Option value="cursive">cursive</Select.Option>
          <Select.Option value="helvetica">Helvetica</Select.Option>
        </Select>
      )
  }
}

function renderProps(prop: PropItem, disabled: boolean, key: any) {

  return render(prop.meta.config.type, {
    disabled: disabled || prop.disabled,
    onChange: (v: any) => {
      prop.set(v)
    },
    children: prop.meta.config.children,
    metaProps: prop.meta.config.props,
    propValue: prop.itemValue
  }, key)
}

export const PropertyItem = ({prop, disabled}: {
  prop: PropItem,
  disabled: boolean
}) => {

  const [ver, serVer] = useState(0)
  useEffect(() => {
    const sub = prop.on(Topic.PropertyChanged)
      .subscribe(() => {
        serVer(x => x + 1)
      }) 
    return () => {
      sub && sub.unsubscribe()
    }
  }, [prop])

  return (
    <div className="propsItem" key={ver}>
      <span>{prop.meta.config.label}</span>
      {renderProps(prop, disabled, prop.meta.config.name)}
    </div>
  )
}