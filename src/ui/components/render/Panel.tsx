import style from "./render.module.scss"
export const Panel = ({children}: {
  children: JSX.Element
}) => {
  return (
    <div className={style.panel}>
      {children}
    </div>
  )
}