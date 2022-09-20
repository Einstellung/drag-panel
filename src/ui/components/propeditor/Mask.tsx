import { MouseEventHandler, ReactNode } from "react"

export const Mask = ({children, onClick, display}: {
  children: ReactNode,
  onClick: MouseEventHandler,
  display: boolean
}) => {
  return (
    <div>
      <div
        className="mask"
        onClick={onClick}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          opacity: 0.2,
          display : display ? "block" : "none"
        }}
      >
      </div>
      {children}
    </div>
  )
}