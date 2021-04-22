/**
 * @param {number[][]} heightMap
 * @return {number}
 */
var trapRainWater = function (heightMap, moves) {
  let h = heightMap.length
  let w = heightMap[0].length
  let numZeros = (w - 2) * (h - 2) //number of tiles left to be traversed
  let waterLevel = 0 //current water level within borders
  let minHeight //minimum height of border tiles
  let currMoves = []
  let total = 0 //total is the amount of water that can be held

  //check for too small of a matrix
  if (h < 3 || w < 3) {
    return { moves: [], solvable: false }
  }

  let traversed = [] //record of tiles that have been traversed
  for (var i = 0; i < h; i++) {
    traversed[i] = []
    for (var j = 0; j < w; j++) {
      traversed[i][j] = 0
    }
  }

  //add outer tiles of heightMap as border
  let borderCoords = [] //coordinates of border tiles. index is row, value is column.
  for (let i = 0; i < h; i++) {
    borderCoords[i] = []
  }

  //traverse all border tiles and corners
  //top and bottom
  for (let i = 1; i < w - 1; i++) {
    borderCoords[0].push(i)
    borderCoords[h - 1].push(i)
    traversed[0][i] = 1
    traversed[h - 1][i] = 1
    //add these to moves
    currMoves.push([[0], [i]], [[h - 1], [i]])
  }
  //right and left sides
  for (let j = 1; j < h - 1; j++) {
    borderCoords[j].push(0)
    borderCoords[j].push(w - 1)
    traversed[j][0] = 1
    traversed[j][w - 1] = 1
    currMoves.push([[j], [0]], [[j], [w - 1]])
  }
  //add initial border to moves
  moves.push({
    currStep: 0,
    currMoves: currMoves,
    total: total,
    waterLevel: waterLevel,
  })
  currMoves = []

  //corners
  traversed[0][0] = 1
  traversed[0][w - 1] = 1
  traversed[h - 1][0] = 1
  traversed[h - 1][w - 1] = 1
  currMoves.push([[0], [0]], [[0], [w - 1]], [[h - 1], [0]], [[h - 1], [w - 1]])
  moves.push({
    currStep: 0,
    currMoves: currMoves,
    total: total,
    waterLevel: waterLevel,
  })
  currMoves = []

  //main loop
  while (numZeros !== 0) {
    //if new minHeight is more than old, add (newMinHeight - OldMinHeight)*numZerosY
    for (let i = 0; i < borderCoords.length; i++) {
      if (borderCoords[i].length > 0) {
        minHeight = heightMap[i][borderCoords[i][0]]
        break
      }
    }
    for (let i = 0; i < borderCoords.length; i++) {
      for (let j = 0; j < borderCoords[i].length; j++) {
        if (heightMap[i][borderCoords[i][j]] < minHeight) {
          minHeight = heightMap[i][borderCoords[i][j]]
        }
      }
    }

    if (minHeight > waterLevel) {
      total += (minHeight - waterLevel) * numZeros
      waterLevel = minHeight
    }

    //find lowest border tile
    let mini, minj
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < borderCoords[i].length; j++) {
        if (heightMap[i][borderCoords[i][j]] === minHeight) {
          mini = i
          minj = borderCoords[i][j]
          break
        }
      }
    }
    //add lowest border node to moves
    currMoves.push([mini, minj])
    moves.push({
      currStep: 1,
      currMoves: currMoves,
      total: total,
      waterLevel: waterLevel,
    })
    currMoves = []

    //get 0 tile next to lowest border tile
    let nextTile = checkNeighbor(mini, minj, 0)

    //We have our new tile at lowestCoords
    //update traversed
    traversed[nextTile[0]][nextTile[1]] = 1
    //update numZeros
    numZeros -= 1
    //remove rock of nextTile from total
    if (heightMap[nextTile[0]][nextTile[1]] <= waterLevel) {
      total -= heightMap[nextTile[0]][nextTile[1]]
    } else {
      total -= waterLevel
    }
    //add nextTile to border
    borderCoords[nextTile[0]].push(nextTile[1])
    currMoves.push([nextTile[0], nextTile[1]])
    moves.push({
      currStep: 2,
      currMoves: currMoves,
      total: total,
      waterLevel: waterLevel,
    })
    currMoves = []

    //check neighbors of new border tile, if they're no longer next to a 0 tile, then remove them. also check nextTile
    //above
    let bordi = nextTile[0] - 1
    let bordj = nextTile[1]
    if (borderCoords[bordi].includes(bordj)) {
      if (checkNeighbor(bordi, bordj, 0).length === 0) {
        let indexToRemove = borderCoords[bordi].indexOf(bordj)
        borderCoords[bordi].splice(indexToRemove, 1)
        currMoves.push([bordi, bordj])
      }
    }
    //below
    bordi = nextTile[0] + 1
    bordj = nextTile[1]
    if (borderCoords[bordi].includes(bordj)) {
      if (checkNeighbor(bordi, bordj, 0).length === 0) {
        let indexToRemove = borderCoords[bordi].indexOf(bordj)
        borderCoords[bordi].splice(indexToRemove, 1)
        currMoves.push([bordi, bordj])
      }
    }
    //left
    bordi = nextTile[0]
    bordj = nextTile[1] - 1
    if (borderCoords[bordi].includes(bordj)) {
      if (checkNeighbor(bordi, bordj, 0).length === 0) {
        let indexToRemove = borderCoords[bordi].indexOf(bordj)
        borderCoords[bordi].splice(indexToRemove, 1)
        currMoves.push([bordi, bordj])
      }
    }
    //right
    bordi = nextTile[0]
    bordj = nextTile[1] + 1
    if (borderCoords[bordi].includes(bordj)) {
      if (checkNeighbor(bordi, bordj, 0).length === 0) {
        let indexToRemove = borderCoords[bordi].indexOf(bordj)
        borderCoords[bordi].splice(indexToRemove, 1)
        currMoves.push([bordi, bordj])
      }
    }
    //nextTile
    bordi = nextTile[0]
    bordj = nextTile[1]
    if (borderCoords[bordi].includes(bordj)) {
      if (checkNeighbor(bordi, bordj, 0).length === 0) {
        let indexToRemove = borderCoords[bordi].indexOf(bordj)
        borderCoords[bordi].splice(indexToRemove, 1)
        currMoves.push([bordi, bordj])
      }
    }
    //update moves with border tiles to remove
    moves.push({
      currStep: 3,
      currMoves: currMoves,
      total: total,
      waterLevel: waterLevel,
    })
    currMoves = []
  }

  return { moves: moves, solvable: true }

  //checks neighbors of a tile for a certain value of traversed, returns the first neighbor's coordinates to satisfy
  function checkNeighbor(i, j, value) {
    //above
    try {
      if (traversed[i - 1][j] === value) {
        return [i - 1, j]
      }
    } catch {
      //neighbor doesn't exist so do nothing. This happens at the edges of heightMap and traversed.
    }
    //below
    try {
      if (traversed[i + 1][j] === value) {
        return [i + 1, j]
      }
    } catch {
      //neighbor doesn't exist so do nothing
    }
    //left
    try {
      if (traversed[i][j - 1] === value) {
        return [i, j - 1]
      }
    } catch {
      //neighbor doesn't exist so do nothing
    }

    //right
    try {
      if (traversed[i][j + 1] === value) {
        return [i, j + 1]
      }
    } catch {
      //neighbor doesn't exist so do nothing
    }

    return []
  }
}

export default function initialAlg(heightMap) {
  let { moves, solvable } = trapRainWater(heightMap, [])

  return { moves: moves, solvable: solvable }
}
