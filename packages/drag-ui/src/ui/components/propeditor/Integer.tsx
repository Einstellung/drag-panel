import {Input} from 'antd'
import { PropComponentProps } from './propeditor.types'
import useValue from './useValue'
interface IntegerProps {
}

function parseInt(value : string | number) : number | null {
	if(typeof value === 'number') {
		return value
	}
	
	if(/^\d+px\$/.test(value)) {
		value = value.replace("px", "")
	}
	if(value === '' || value === undefined) {
		return null
	}
	const val = Number.parseInt(value)
	if(isNaN(val)) {
		return null
	}
	return val
}
export const Integer = ({ onChange, propValue, metaProps , disabled }: IntegerProps  & PropComponentProps) => {

  // 将onChange能力封装在useValue里面，不用每次setValue的时候再onChange
  // 数据发生变更时会导致proValue（propItem的itemValue）发生变化，渲染组件只需要拿数据渲染即可
	const [value, setValue] = useValue<number | null>(() => parseInt(propValue), onChange)

  return (
    <Input
      {...metaProps}
			disabled={disabled}
      value={value}
			style={{width : 60}}
      onKeyDown={(e) => {
				if(e.key === 'Backspace' || e.key === "Delete") {
					return
				}
				
				if(e.key === "ArrowUp") {
					console.log(value)
					setValue( value => {
						if(value === null) {return 1}
						return value + 1
					})
					return
				}
				else if(e.key === 'ArrowDown') {
					setValue((value) => {
            if (value === null) {
              return 0
            }
            return Math.max(0, value - 1)
          })
				}

				if(!e.key.match(/[0-9]/)) {
					e.preventDefault()
					e.stopPropagation()
					return
				}
      }}
      onChange={(e) => {
        const value = e.target.value
				if(value === "") {
					setValue(null)
				} else {
					setValue(parseInt(value))
				}
      }}
    />
  )
}
