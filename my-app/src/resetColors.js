function Node(row, col) {
  return document.getElementById(`node-${row}-${col}`)
} // Gets a node from the screen

export default function resetColors(height, width) {
  //reset node colors in grid
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      Node(row, col).className = "node"
    }
  }

  //reset colors of steps
  for (let i = 1; i < 5; i++) {
    document.getElementById(`step${i}`).style.background = "rgba(255, 0, 43, 0)"
  }
  document.getElementById("end").style.background = "rgba(255, 0, 43, 0)"

  document.getElementById(
    "Error"
  ).innerHTML = `Total Water: 0 \n Water Level: 0`
}
