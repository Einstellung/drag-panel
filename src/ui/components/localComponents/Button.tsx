import { Bridge } from "../../../meta"
import { TextInput } from "./TextInput"

interface ButtonProps {
  bridge: Bridge,
  passProps: any
}

export const Button = ({bridge, passProps}: ButtonProps) => {

  const text = passProps.text
  return (
    <div className="">
      <TextInput 
        text={text}
      />
    </div>
  )
}