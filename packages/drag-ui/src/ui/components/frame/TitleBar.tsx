import { Tooltip } from "antd"
import classes from "./frame.module.scss"

interface RouteProps {
  title: string,
  imgUrl: string,
  clickHref: string, // 点击后跳转路径
}

const Route = ({title, imgUrl, clickHref}: RouteProps) => {
  return (
    <Tooltip placement="bottom" title={title}>
      <div className={classes.btn}
        onClick={() => {
          window.location.href = clickHref
        }}
      >
        <img src={imgUrl} />
      </div>
    </Tooltip>
  )
}


export const TitleBar = () => {
  return (
    <header className={classes.titlebar}>
      <h2>DragPanel</h2>
      <div className={classes.route}>
        <Route
          title="搭建平台"
          imgUrl="https://s1.ax1x.com/2022/09/25/xE41oT.png"
          clickHref="/"
        />
        <Route
          title="预览"
          imgUrl="https://s1.ax1x.com/2022/09/25/xE4GYF.png"
          clickHref="/preview/"
        />
        <Route
          title="轻代码"
          imgUrl="https://s1.ax1x.com/2022/09/25/xE4Nl9.png"
          clickHref="/codeless/"
        />
        {/* <Route
          title="服务端"
          imgUrl="https://s1.ax1x.com/2022/09/25/xE4UyR.png"
        />
        <Route
          title="上线平台"
          imgUrl="https://s1.ax1x.com/2022/09/25/xE4aO1.png"
        /> */}
      </div>
    </header>
  )
}