function Node(row, col) {
  return document.getElementById(`node-${row}-${col}`)
} // Gets a node from the screen

//this function is bound to App
//so that it can call the functions in App

export default function stepBackward() {
  //copy funtions from app so they can be called within helper
  let setCurrIndex = this.setCurrIndex
  let currIndex = this.state.currIndex
  let moves = this.state.moves

  if (currIndex < 2) {
    //no previous move so return
    //no need to set moves or solvable since play or stepForward will do that in the first step
    // console.log("no previous move")
    return
  } else if (currIndex === 2) {
    //Only first step is done so undo first step
    //make initial border
    let tempMoves = moves[0].currMoves
    for (let i = 0; i < tempMoves.length; i++) {
      Node(tempMoves[i][0], tempMoves[i][1]).className = "node"
    }
    //color corners
    tempMoves = moves[1].currMoves
    for (let i = 0; i < tempMoves.length; i++) {
      Node(tempMoves[i][0], tempMoves[i][1]).className = "node"
    }

    //set About color
    document.getElementById("step1").style.background = "rgba(255, 0, 43, 0)"

    //we finished step 0, so currIndex = 2 now
    currIndex = 0
    this.setState({ currIndex: currIndex })
  } else if (
    currIndex === moves.length &&
    document.getElementById("end").style.background === "rgba(255, 0, 43, 0.3)"
  ) {
    //we're at the end step. Note that the end step and the step before have the same currIndex,
    //which is why we don't update currIndex in this step

    //remove color of end step
    document.getElementById("end").style.background = "rgba(255, 0, 43, 0)"

    //set color of step 4
    document.getElementById("step4").style.background = "rgba(255, 0, 43, 0.3)"
  } else {
    //no more special cases

    //set color of steps
    document.getElementById(
      `step${moves[currIndex - 2].currStep + 1}`
    ).style.background = "rgba(255, 0, 43, 0.3)"
    //reset About color from previous step
    document.getElementById(
      `step${moves[currIndex - 1].currStep + 1}`
    ).style.background = "rgba(255, 0, 43, 0)" //set background opacity of last item to 0 to remove highlighting.

    //update total and waterLevel on screen
    document.getElementById("Error").innerHTML = `Total Water: ${
      moves[currIndex - 2].total
    } \n Water Level: ${moves[currIndex - 2].waterLevel}`

    //check the currStep
    let move, prevMove
    if (moves[currIndex - 1].currStep === 1) {
      //highlight lowest border node
      move = moves[currIndex - 1].currMoves[0]
      Node(move[0], move[1]).className = "node-finish"
    } else if (moves[currIndex - 1].currStep === 2) {
      //add new border node
      move = moves[currIndex - 1].currMoves[0]
      Node(move[0], move[1]).className = "node"
    } else if (moves[currIndex - 1].currStep === 3) {
      //add removed border nodes
      for (let i = 0; i < moves[currIndex - 1].currMoves.length; i++) {
        //remove border node
        move = moves[currIndex - 1].currMoves[i]
        Node(move[0], move[1]).className = "node-finish"
      }

      //add highlighting of lowest border node
      prevMove = moves[currIndex - 3].currMoves[0]
      Node(prevMove[0], prevMove[1]).className = "node-start"
    }

    currIndex -= 1
    setCurrIndex(currIndex)
  }
}
