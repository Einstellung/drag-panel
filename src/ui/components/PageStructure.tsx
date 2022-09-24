import {Tree} from 'antd'
import {SwitcherOutlined, SelectOutlined, BorderOutlined} from '@ant-design/icons'
import { UIModel } from '../object/UIModel'
import { Node, Topic } from '../../meta'
import { useEffect, useState } from 'react'

function getIcon(group :string) {
  switch(group) {
    case 'basic' :
      return <SwitcherOutlined />
    case "custom" :
      return <SelectOutlined />
    case 'container':
      return <BorderOutlined />
  }
}

function getTreeData(node: Node): any {
  return {
    title: node.getName(),
    key: node.getId(),
    icon: getIcon(node.getGroup()),
    children: node.getChildren().map((child: Node) => getTreeData(child))
  }
}

export const PageStructure = ({editor}: {
  editor: UIModel
}) => {

  const root = editor.page.getRoot()

  const [,setVer] = useState(0)
  useEffect(() => {
    const sub = editor.on(Topic.NewNodeAdded)
      .subscribe(() => {
        setVer(x => x + 1)
      })

    return () => {
      sub && sub.unsubscribe()
    }
  })

  return (
    <Tree 
      showIcon
      defaultExpandAll
      treeData={[getTreeData(root)]}
    />
  )
}