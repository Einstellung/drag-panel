import { groupBy } from "ramda"
import { useEffect, useRef, useState } from "react"
import { ComponentsLoader } from "../../loader"
import { UIEvents, UIModel } from "../object/UIModel"
import style from "./compo-list.module.scss"

export const ComponentList = ({editor}: {
  editor: UIModel
}) => {
  const loader = useRef(ComponentsLoader.get())

  const [ver, setVer] = useState(0)

  const groupTitle : any = {
    basic : "基础组件",
    container : "容器组件",
    "custom-react" : "外部React组件",
    "custom-vue" : "外部Vue组件",
  }

  const groupList = Object.values(groupBy(x => x.group, loader.current.list))

  useEffect(() => {
    setVer(x => x + 1)
  }, [])

  return (
    <div className={style['component-list']} key={ver}>
      {
        groupList.map((list, i) => {
          const title = groupTitle[list[0].group]
          return(
            <div className={style['component-list-inner']} key={i}>
              <h2>{title}</h2>
              {
                list.map(compConf => {
                  return (
                    <div 
                      key={compConf.name}
                      draggable
                      onDragStart={e => {
                        console.log("component drag start")
                        editor.dispatch(UIEvents.EvtStartDragAdd, compConf)
                      }}
                      className={style['component-list-item']}>
                      <img src={compConf.imageUrl}/>
                      <div className={style.text}>{compConf.title}</div>
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}