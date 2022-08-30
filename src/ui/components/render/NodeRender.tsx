import { Draggable } from "../draggable/Draggable"

export const NodeRender = () => {
  return (
    <div>
      <Draggable 
        onDragEnd={e => {
        console.log("val test")
      }}
        onDrag={e => {
          console.log("on drag")
        }}
      >
        <h1 
          draggable
          style={{
            width: "fit-content"
          }}
          >
            面板
        </h1>
      </Draggable>
    </div>
  )
}