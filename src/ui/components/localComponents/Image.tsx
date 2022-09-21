import { Bridge } from "../../../meta"
import classes from "./component.module.scss"

export const Image = ({bridge, passProps}: {
  bridge: Bridge,
  passProps: any
}) => {

  return (
    <div className={classes.image}>
      <input type="file" 
        onClick={e => {
          console.log(e)
        }}
      />
      <img src="https://image.shutterstock.com/image-vector/earth-smiling-260nw-37895044.jpg" />
    </div>
  )
}