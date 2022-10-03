import { groupBy } from "ramda"
import {CaretDownOutlined,  CaretRightOutlined} from '@ant-design/icons'
import { Fragment, useState } from "react"
import { GroupMeta } from "@drag/meta"
import { PropItem } from "../../object/PropItem"
import { PropertyItem } from "./PropertyItem"
import classes from "./prop-editor.module.scss"

export const PropertyGroup = ({group, props}: {
  group: GroupMeta,
  props: {[name: string]: PropItem}
}) => {

  // 查询和group对应的itemProps
  const list = Object.values(props).filter(x => group.propKeys.has(x.meta.config.name))
  
  // 根据row数据对list进行分组，有rowlabel的地方将来要展示出来
  // 有的地方没有row，所以用""取消分组
  const groupsMap = groupBy(x => x.meta.config.row + "", list)
  const groups = Object.values(groupsMap)


  const [caretState, setCaret] = useState(1)
  const groupStyle = Object.assign({}, group.style)
  if(caretState === 0) {
    groupStyle.display = "none"
  }

  return (
    <div className={classes.group}>
      <h2
        onClick={() => {
          setCaret(x => 1 - x)
        }}
      >
        <span>{group.title}</span>
        {caretState === 0 ? <CaretDownOutlined /> : <CaretRightOutlined />}
      </h2>
      
      <div className="groupItems" style={groupStyle}>
        {
          groups.map((list, i) => {
            return (
              <Fragment key={i}>
                <h3 className={classes['row-labe']}>{list[0].meta.config.rowLabel}</h3>
                <div className={`${classes['group-row']} 
                  ${i === groups.length - 1 ? classes.last : ""}`}>
                  {
                    list.map(prop => {
                      return (
                        <PropertyItem 
                          prop={prop} 
                          disabled={false} 
                          key={prop.meta.config.name} 
                        />
                      )
                    })
                  }
                </div>
              </Fragment>
            )
          })
        }
      </div>
    </div>
  )
}