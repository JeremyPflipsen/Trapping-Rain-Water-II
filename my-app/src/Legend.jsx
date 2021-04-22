import React from "react"
import Node from "./PathfindingVisualizer/Node/Node.jsx"
import "./Legend.css"

export default function Legend(props) {
  switch (props.selectedAlg) {
    case 1:
      return (
        <div className="Legend">
          <div className="Legend-item">
            <Node isStart={false} isFinish={false}></Node> = Inner Tile
          </div>
          <div className="Legend-item">
            <Node isStart={false} isFinish={true}></Node> = Border Tile
          </div>
          <div className="Legend-item">
            <Node isStart={true} isFinish={false}></Node> = Lowest Border Tile
          </div>
          <div className="Legend-item">
            <Node className="node-visited"></Node> = Traversed Tile
          </div>
        </div>
      )

    default:
      return <div></div>
  }
}
