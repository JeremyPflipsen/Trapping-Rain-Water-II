import React from "react"
import "./Error.css"
import Legend from "./Legend.jsx"

export default function Error(props) {
  let message = ""
  switch (props.selectedAlg) {
    case 1:
      message = `Total Water: 0 \n
                Water Level: 0`
      break

    default:
      break
  }
  return (
    <div className={"ErrorLegend"}>
      <div className="Error" id="Error">
        {message}
      </div>
      <Legend selectedAlg={props.selectedAlg}></Legend>
    </div>
  )
}
