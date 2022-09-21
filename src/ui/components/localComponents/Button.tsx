import { Bridge } from "../../../meta"
import { TextInput } from "./TextInput"
import classes from "./component.module.scss"

interface ButtonPassProps {
  text: string,
  color: string,
  fontFamily: string,
  fontSize: number,
  align: "left" | "right" | "center",
  style: {[key: string]: any}
}

interface ButtonProps {
  bridge: Bridge,
  passProps: ButtonPassProps
}

export const Button = ({bridge, passProps}: ButtonProps) => {
  
  const applyStyle = {
    fontFamily: passProps.fontFamily,
    fontSize: passProps.fontSize,
    textAlign: passProps.align,
    color: passProps.color,
    ...passProps.style
  }

  const text = passProps.text
  return (
    <div className={classes.button} style={applyStyle}>
      <TextInput
        onTextChange={(text: string) => {
          bridge.setPropValue(["text"], text)
        }}
        text={text}
      />
    </div>
  )
}