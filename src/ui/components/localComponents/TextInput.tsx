import { useState } from "react"
import styles from "./component.module.scss"

export const TextInput = ({text}: {
  text: string
}) => {

  const [state, setState] = useState({text: text, state: "display"})

  return (
    <div
      className={styles['txt-input']}
      onDoubleClick={e => {
        setState(x => {
          return {...x, state: "edit"}
        })
      }}
    >
      <span style={{
        display: state.state === "display" ? "block" : "none"
      }}>
        {text}
      </span>
      <input
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