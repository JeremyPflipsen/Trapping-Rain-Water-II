import React from "react"
import "./Menu.sass"

export default function Menu(props) {
  return (
    <nav className="menu">
      <ol>
        <li className="menu-item" onClick={props.resetGrid}>
          <a href="#0">Reset Grid</a>
        </li>
        <button className="playPause" onClick={props.stepBackward}>Step Back</button>
        <button
          id="playPause"
          onClick={props.handleClick}
          href="#"
          className="playPause"
        >
          Play
        </button>
        <button className="playPause" onClick = {props.stepForward}>Step Forward</button>
        <li className="menu-item">
          <a href="#0">Load Grid</a>
          <ol className="sub-menu">
            <li className="menu-item">
              <a href="#0">Make Grid from Dimensions</a>
              <form>
                <label for="heightInput"><a href="#0">Enter Height:</a></label>
                <br></br>
                <input
                  id="heightInput"
                  type="number"
                  min="1"
                  max="50"
                  value={props.gridHeight}
                  onChange={(event) => props.setGridHeight(event.target.value)}
                ></input>
                <br></br>
                <label for="widthInput" type="number">
                  <a href="#0">Enter Width:</a>
                </label>
                <br></br>
                <input
                  id="widthInput"
                  type="number"
                  min="1"
                  max="50"
                  value={props.gridWidth}
                  onInput={(event) => props.setGridWidth(event.target.value)}
                ></input>
                <br></br>
                <input
                  type="submit"
                  onClick={() => props.setGrid("dimensionInput")}
                ></input>
              </form>
              <br></br>
            </li>
            <li className="menu-item">
              <form>
                <label for="arrayInput"><a href="#0">Enter as 2D Array:</a></label>
                <input
                  id="arrayInput"
                  value={props.tempGrid}
                  onInput={(event) => props.setTempGrid(event.target.value)}
                ></input>
                <input
                  type="submit"
                  onClick={() => props.setGrid("arrayInput")}
                ></input>
              </form>
            </li>
            <li className="menu-item" onClick={props.loadRGrid}>
              <a href="#0">Load Random Grid</a>
            </li>
          </ol>
        </li>
      </ol>
    </nav>
  )
}
