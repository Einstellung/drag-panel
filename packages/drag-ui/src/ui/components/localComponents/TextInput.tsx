import { useEffect, useRef, useState } from "react"
import styles from "./component.module.scss"

export const TextInput = ({text, onTextChange}: {
  text: string,
  onTextChange?: Function,
}) => {

  const [state, setState] = useState({text: text, state: "display"})

  useEffect(() => {
    if(state.text !== text) {
      onTextChange && onTextChange(state.text)
    }
  }, [state.text])

  // 点击后聚焦input文本
  const iptRef = useRef<HTMLInputElement>(null)
  // 只需要初始化的时候赋值一下就可以了，数据变更发生重绘尽可能都收敛到nodeRender
  useEffect(() => {
    iptRef.current!.value = text
  }, [])

  return (
    <div
      className={styles['txt-input']}
      onDoubleClick={e => {
        setState(x => {
          return {...x, state: "edit"}
        })
        setTimeout(() => {
          iptRef.current?.select()
        }, 5)
      }}
    >
      <span style={{
        display: state.state === "display" ? "block" : "none"
      }}>
        {text}
      </span>
      <input
        ref={iptRef}
        style={{
          display: state.state === "edit" ? "block" : "none"
        }}
        onChange={e => {
          setState(x => {
            return {...x, text: e.target.value}
          })
        }}
        onBlur={e => {
          setState(x => {
            return {...x, state: "display"}
          })
        }}
      />
    </div>
  )
}