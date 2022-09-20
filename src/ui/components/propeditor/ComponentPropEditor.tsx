import { useEffect, useState } from "react"
import { Topic } from "../../../meta"
import { UIModel } from "../../object/UIModel"
import { PropertyGroup } from "./PropertyGroup"
import classes from "./prop-editor.module.scss"
import "./antd-patch.css"

export const ComponentPropEditor = ({editor}: {
  editor: UIModel
}) => {
  
  const [ver, setVer] = useState(0)
  useEffect(() => {
    const sub = editor.propertyEditor.on(Topic.PropertyModelUpdated)
      .subscribe(() => {
        setVer(x => x + 1)
      })
    
    return () => {
      sub && sub.unsubscribe()
    }
  }, [editor])

  return (
    <div className={classes.editor} key={ver}>
      {
        editor.propertyEditor.groups.map(group => {
          return <PropertyGroup key={group.name} group={group} 
            props={editor.propertyEditor.itemProps}/>
        })
      } 
    </div>
  )
}