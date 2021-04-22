import resetColors from "../resetColors"

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

export default function loadRGrid(grid) {
  //reset colors of grid
  resetColors(grid.length, grid[0].length)

  let nodes = grid

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      nodes[row][col] = getRandomInt(10)
    }
  }

  return grid
}
