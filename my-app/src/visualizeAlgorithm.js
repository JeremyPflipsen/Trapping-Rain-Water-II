import initialAlg from "./algorithms/initialAlg"

//This function is bound to App.js so that App may
//call any algorithm and visualize it

export default function visualizeAlgorithm() {
  switch (this.state.selectedAlg) {
    case 0:
      console.log("No algorithm selected!")
      break

    case 1:
      if (this.state.mode === "play") {
        //currently in play mode, let's pause it. This will end the current instance of visualize InitialAlg
        this.setState({ mode: "pause" })
        document.getElementById("playPause").innerHTML = "Play"
        break
      }
      //mode === "pause" so we initiate the play mode
      document.getElementById("playPause").innerHTML = "Pause"
      this.setState({ mode: "play" })
      setTimeout(() => {
        let temp = initialAlg(this.state.grid)
        this.visualizeInitialAlg(temp.moves, temp.solvable)
        this.setState({ moves: temp.moves })
      }, 1)
      break

    default:
      console.log("You selected an algorithm!")
      break
  }
}
