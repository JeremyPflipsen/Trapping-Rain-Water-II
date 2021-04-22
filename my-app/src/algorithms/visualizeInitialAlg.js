function Node(row, col) {
  return document.getElementById(`node-${row}-${col}`)
} // Gets a node from the screen

//this function is bound to App
//so that it can call the functions in App

export default function visualizeInitialAlg(moves, solvable) {
  //copy funtions from app so they can be called within helper
  let setCurrIndex = this.setCurrIndex
  let getMode = this.getMode
  let setMode = this.setMode

  //Check if matrix is too small
  if (!solvable) {
    console.log("matrix too small")
    document.getElementById("Error").innerHTML =
      "Matrix has no inner tiles. Total Water = 0."
    return
  }

  let currIndex = this.state.currIndex //how far we are along moves
  // console.log("In visualizeInitialAlg", currIndex)

  //reset className of <div id="end"><div> if it's still highlighted fromprevious run
  document.getElementById("end").className = ""

  if (currIndex < 1) {
    //make initial border
    let tempMoves = moves[0].currMoves
    for (let i = 0; i < tempMoves.length; i++) {
      Node(tempMoves[i][0], tempMoves[i][1]).className = "node-finish"
    }
    //color corners
    tempMoves = moves[1].currMoves
    for (let i = 0; i < tempMoves.length; i++) {
      Node(tempMoves[i][0], tempMoves[i][1]).className = "node-visited"
    }

    //set About color
    document.getElementById("step1").style.background = "rgba(255, 0, 43, 0.3)"

    //we finished step 0, so currIndex = 2 now
    currIndex = 2

    setTimeout(() => {
      helper(moves.slice(currIndex)) //currIndex is 2
      return
    }, 1000)
  } else {
    helper(moves.slice(currIndex))
    return
  }

  //show rest of moves
  function helper(restMoves) {
    //check if the pause button has been pressed
    if (getMode() === "pause") {
      //update currIndex
      setCurrIndex(currIndex)
      return
    }

    if (restMoves.length < 1) {
      document.getElementById("end").style.background = "rgba(255, 0, 43, 0.3)"
      document.getElementById("step4").style.background = "rgba(255, 0, 43, 0)"
      //update currIndex
      setCurrIndex(currIndex)
      setMode("pause")
      document.getElementById("playPause").innerHTML = "Play"
      return currIndex
    }

    //set About color for current step
    document.getElementById(
      `step${restMoves[0].currStep + 1}`
    ).style.background = "rgba(255, 0, 43, 0.3)"
    //reset About color from previous step
    document.getElementById(
      `step${moves[currIndex - 1].currStep + 1}`
    ).style.background = "rgba(0, 0, 0, 0)" //set background opacity of last item to 0 to remove highlighting.

    //update total and waterLevel on screen
    document.getElementById(
      "Error"
    ).innerHTML = `Total Water: ${restMoves[0].total} \n Water Level: ${restMoves[0].waterLevel}`

    let move
    let prevMove
    if (restMoves[0].currStep === 1) {
      //highlight lowest border node
      move = restMoves[0].currMoves[0]
      Node(move[0], move[1]).className = "node-start"
    } else if (restMoves[0].currStep === 2) {
      //add new border node
      move = restMoves[0].currMoves[0]
      Node(move[0], move[1]).className = "node-finish"
    } else if (restMoves[0].currStep === 3) {
      //remove highlighting of lowest border node from step 1
      prevMove = moves[currIndex - 2].currMoves[0]
      Node(prevMove[0], prevMove[1]).className = "node-finish"

      for (let i = 0; i < restMoves[0].currMoves.length; i++) {
        //remove border node
        move = restMoves[0].currMoves[i]
        Node(move[0], move[1]).className = "node-visited"
      }
    }

    //we finished another step so increment currIndex
    currIndex += 1

    //recursive call
    setTimeout(() => {
      helper(restMoves.slice(1))
    }, 300)
  }
}
