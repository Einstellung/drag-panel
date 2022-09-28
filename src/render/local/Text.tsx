import { Bridge } from "../../meta"
import classes from "./component.module.scss"

interface TextPassProps {
  text: string,
  color: string,
  fontFamily: string,
  fontSize: number,
  align: "left" | "right" | "center",
  style: {[key: string]: any}
}

export const Text = ({bridge, passProps}: {
  bridge: Bridge,
  passProps: TextPassProps
}) => {

  const applyStyle = {
    fontFamily: passProps.fontFamily,
    fontSize: passProps.fontSize,
    textAlign: passProps.align,
    color: passProps.color,
    ...passProps.style
  }

  return (
    <div className={classes.text} style={applyStyle}>
      <p>{passProps.text}</p>
    </div>
  )
}