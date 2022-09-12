import styles from "./component.module.scss"

export const TextInput = ({text}: {
  text: string
}) => {
  return (
    <div
      className={styles['txt-input']} 
    >
      <span>
        {text}
      </span>
    </div>
  )
}