import React, { Component } from "react"
import "./About.css"

export default class About extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.chooseAbout = this.chooseAbout.bind(this)
  }

  chooseAbout(alg) {
    switch (alg) {
      case 1:
        return (
          <div>
            The full steps and explanation of this algorithm are in my github.
            <br></br>
            <br></br>
            <div id="step1">
              Step 1: Initialize Water Level, Total Water, and Border.
            </div>
            <br></br>
            While(there are still inner tiles to be traversed)
            <br></br>
            <p id="step2" className="loopItem">
              Step 2: Find lowest Border tile.
            </p>
            <br></br>
            <div id="step3" className="loopItem">
              Step 3: Choose Inner Tile adjacent to lowest Border tile. Update
              Total Water and Water Level. Make the Inner tile a Border tile.
            </div>
            <br></br>
            <div id="step4" className="loopItem">
              Step 4: Remove Border tiles that aren't adjacent to any Inner
              tiles.
            </div>
            <br></br>
            <div id="end">End</div>
          </div>
        )

      default:
        return "Choose an algorithm!"
    }
  }

  render() {
    return (
      <span className="About">{this.chooseAbout(this.props.selectedAlg)}</span>
    )
  }
}
