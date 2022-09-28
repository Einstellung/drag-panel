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
    case "list":
      console.log("list props", props)
      return
    case "size":
      return <SizeInput key={key} {...props}/>
    // 在codeless中使用
    case "name":
      return <StringInput />
    // 比如边框等输入框
    case "integer":
      return <Integer key={key} {...props}/>
    case "color":
      return <ColorPicker
               key={key}
               disabled={props.disabled}
               defaultValue={props.propValue}
               onChange={(value: any) => props.onChange(value)}
               />
    case "select":
      return (
        <Select
          key={key}
          disabled={props.disabled}
          defaultValue={props.propValue}
          onChange={value => props.onChange(value)}
        >
          {props.metaProps.selections.map((item: any) => {
            return <Select.Option key={item.value} value={item.value}>{item.text}</Select.Option>
          })}
        </Select>
      )
    case "font-family":
      return (
        <Select
          key={key}
          disabled={props.disabled}
          {...props.metaProps}
          onChange={(value) => props.onChange(value)}
          defaultValue={props.propValue}
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
    // children表示有嵌套，可以继续递归的渲染
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