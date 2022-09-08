import { Bridge } from "../../../meta"

interface ButtonProps {
  bridge: Bridge,
  passProps: any
}

export const Button = ({bridge, passProps}: ButtonProps) => {

  const text = passProps.text
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}