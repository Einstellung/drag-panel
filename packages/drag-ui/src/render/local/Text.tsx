import { Bridge, Topic } from "@drag/meta"
import { useEffect, useState } from "react"
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

  const [, setVer] = useState(0)
  useEffect(() => {
    bridge.on(Topic.MemorizedDataChanged)
      .subscribe(() => {
        setVer(x => x + 1)
      })
  }, [])

  const applyStyle = {
    fontFamily: passProps.fontFamily,
    fontSize: passProps.fontSize,
    textAlign: passProps.align,
    color: passProps.color,
    ...passProps.style
  }

  const tmpData = bridge.getTmpData()

  return (
    <div className={classes.text} style={applyStyle}>
      <p>
        {tmpData ? tmpData : passProps.text}
      </p>
    </div>
  )
}