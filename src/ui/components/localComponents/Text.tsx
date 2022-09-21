import { Bridge } from "../../../meta"
import { TextInput } from "./TextInput"
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
      <TextInput 
        onTextChange={(text: string) => {
          bridge.setPropValue(["text"], text)
        }}
        text={passProps.text}
      />
    </div>
  )
}