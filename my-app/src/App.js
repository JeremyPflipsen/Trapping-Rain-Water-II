import React from "react"
import "./App.css"
import PathfindingVisualizer from "./PathfindingVisualizer/PathfindingVisualizer"
import Menu from "./Menu"
import loadRGrid from "./grids/loadRGrid.js"
import About from "./About"
import visualizeAlgorithm from "./visualizeAlgorithm"
import Error from "./Error"
import visualizeInitialAlg from "./algorithms/visualizeInitialAlg"
import stepForward from "./algorithms/stepForward.js"
import stepBackward from "./algorithms/stepBackward.js"
import resetColors from "./resetColors.js"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: [],
      tempGrid: "",
      gridHeight: 9,
      gridWidth: 9,
      selectedAlg: 1,
      mode: "pause", //mode of playPause button
      currIndex: 0, //how far we are though the moves array in visualizeInitialAlg
      moves: [], //the set of moves from initialAlg
    }
    this.visualizeAlgorithm = visualizeAlgorithm.bind(this)
    this.inputValueChange = this.inputValueChange.bind(this)
    this.changeNodeVal = this.changeNodeVal.bind(this)
    this.setGridHeight = this.setGridHeight.bind(this)
    this.setGridWidth = this.setGridWidth.bind(this)
    this.setGrid = this.setGrid.bind(this)
    this.getMode = this.getMode.bind(this)
    this.visualizeInitialAlg = visualizeInitialAlg.bind(this)
    this.setCurrIndex = this.setCurrIndex.bind(this)
    this.stepForward = stepForward.bind(this)
    this.stepBackward = stepBackward.bind(this)
    this.setMode = this.setMode.bind(this)
    this.resetGrid = this.resetGrid.bind(this)
  }

  // stepForward() {
  //   //turn mode to play, then turn it back after 1 millisecond so that visualizeAlgorithm goes through 1 iteration.
  //   this.setState({ mode: "play" })
  //   this.visualizeAlgorithm()
  //   document.getElementById("playPause").innerHTML = "Play" //This overrides visualizeAlgorithm turning the playPause button to "Pause"
  //   setTimeout(() => {
  //     this.setState({ mode: "pause" })
  //   }, 1)
  // }

  resetGrid() {
    resetColors(this.state.grid.length, this.state.grid[0].length)
    this.setState({ mode: "pause" })
    //It'll take a hot second to pause visualizeInitialAlg because of the setTimeout in the recursive call, so we need to wait before we update currIndex
    setTimeout(() => {
      this.setState({ currIndex: 0 })
    }, 301)
    document.getElementById("playPause").innerHTML = "Play"
  }

  setCurrIndex(value) {
    this.setState({ currIndex: value })
  }

  setMode(value) {
    this.setState({ mode: value })
  }

  getMode() {
    return this.state.mode
  }

  changeNodeVal(row, col, value) {
    let newGrid = this.state.grid.slice()
    newGrid[row][col] = value
    this.setState({
      grid: newGrid,
    })
  }

  setGridHeight(event) {
    this.setState({
      gridHeight: event.target.value,
    })
    // console.log("gridHeight", this.state.gridHeight)
  }

  setGridWidth(event) {
    this.setState({
      gridWidth: event.target.value,
    })
    // console.log("gridWidth", this.state.gridWidth)
  }

  setGrid(type) {
    let nodes = []

    //setGrid being called from entering dimensions
    if (type === "dimensionInput") {
      for (let i = 0; i < this.state.gridHeight; i++) {
        let row = []
        for (let j = 0; j < this.state.gridWidth; j++) {
          row.push(0)
        }
        nodes.push(row)
      }
      this.setState({
        grid: nodes,
        moves: [],
        currIndex: 0,
      })
    } else {
      //setGrid being called from entering array
      this.setState({
        grid: JSON.parse(this.state.tempGrid),
        moves: [],
        currIndex: 0,
      })
    }

    //reset colors on all the nodes
    resetColors(this.state.grid.length, this.state.grid[0].length)
  }

  inputValueChange(row, col, event) {
    let value = event.target.value
    let numVal = Number(value)

    if (numVal >= 0 && numVal <= 9) {
      let newGrid = this.state.grid.slice()
      newGrid[row][col] = numVal
      this.setState({
        grid: newGrid,
      })
    }
  }

  componentDidMount() {
    const nodes = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    this.setState({
      grid: nodes,
    })
  }

  render() {
    return (
      <div className="App">
        <h1 className="Header">Algorithm Visualizer</h1>
        <Menu
          gridHeight={this.state.gridHeight}
          gridWidth={this.state.gridWidth}
          tempGrid={this.state.tempGrid}
          handleClick={() => this.visualizeAlgorithm(this.changeNodeVal)}
          stepForward={this.stepForward}
          stepBackward={this.stepBackward}
          setGridHeight={(x) => this.setState({ gridHeight: x })}
          setGridWidth={(x) => this.setState({ gridWidth: x })}
          setTempGrid={(x) => this.setState({ tempGrid: x })}
          setGrid={this.setGrid}
          resetGrid={this.resetGrid}
          loadRGrid={() => {
            this.setState(
              { grid: loadRGrid(this.state.grid), moves: [], currIndex: 0 },
              this.setState({ tempGrid: JSON.stringify(this.state.grid) })
            )
          }}
        ></Menu>
        <div className="flexbox">
          <About selectedAlg={this.state.selectedAlg}></About>
          <PathfindingVisualizer
            inputValueChange={this.inputValueChange}
            grid={this.state.grid}
          ></PathfindingVisualizer>
          <Error selectedAlg={this.state.selectedAlg}></Error>
        </div>
        <h3>p.s. I love you :heart:</h3>
      </div>
    )
  }
}

export default App
