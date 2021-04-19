This is my solution to the LeetCode question Trapping Rain Water II. It works similary to the solution of Trapping Rain Water I quesiton on LeetCode, which solves the 1D case. My explanation will be more clear if you first understand the solution to that question.

In the 1D case, we have a left and right pointer that point the left and right edge of the area we are considering. In the 2D case, this "edge" becomes a "border".

Our input is an m by n matrix, so we start with our border at the edges of the matrix i.e. a rectangle. All of the outtermost tiles of the matrix are part of our border, except the corners. Let's say the minimum height of the tiles in the border is 2. Then, we know for certain that all the tiles within the border must be filled up to a height of 2 with either water or rock, or both. For example, lets say we are given the heightMap
[[2,2,2,2],
 [2,0,1,2],
 [2,2,2,2]]
Our border is all of the tiles on the outside of the matrix, i.e. all the 2s. Then the minimum height of our border is 2 and all the tiles within the border(the 0 and 1 in the middle) must be filled to a height of 2 with either rock or water. What we can do is just say that the space inside the borders is all water, and then subtract the rock as we go.
In this case, we have 2 inner tiles and a minHeight of our border tiles of 2, so 2x2 = 4. Thus we would say we have 4 total water. Then, we traverse over the 0 tile and subract it's rock from the total water. Then we have 4 - 0 = 4 total water. Next we traverse over the 1 tile and subract it's rock, so we have 4 - 1 = 3 total water. Note that if an inner tile has a height greater than the water level within the border, like if the 1 here were a 3, then we can only subtract off the water height. So if the 1 were a 3, then we would have 4 - 2 = 2 total water.

The next step is to understand how the border moves. In the 1D case, our left and right pointers are not stationary. Likewise our border tiles move. When the left pointer moves over a tile, that tile becomes the new left. Likewise, when we traverse over a tile, that tile becomes part of our border. So if we start with our border on the outside of the matrix, and we traverse over the tile at (row = 1, col = 1) in the first step, then the tile at (1,1) becomes part of our new border. As a result, the tiles at (0,1) and (1,0) are no longer important because they aren't adjacent to any inner tiles. These are "covered" by the border tile at (1,1).
After we remove tiles from our border, the minimum height of the border may change. If it increases, we must increase the water level for all tiles within the border and consequently also increase totalWater. If it decreases or stays the same, then our water level stays the same and we don't need to update total.

The whole algorithm looks like this:
1. Initialize waterLevel and totalWater to 0.
2. Initialize outside tiles of heightMap to be the border tiles.
3. Count how many inner tiles there are i.e. how many tiles need to be traversed
4. While(The number of tiles that haven't been traversed is not 0)
5.    Find lowest border tile
6.    If the height of the lowest border tile is greater than the waterLevel, add (minBorderHeight - waterLevel) * number of inner tiles to totalWater and MinBorderHeight becomes the new waterLevel. Otherwise do nothing.
7.    Pick an inner tile next to the lowest border tile. This is called nextTile.
8.    Traverse nextTile, which means to:
9.        Subtract the height of nextTile or waterLevel from totalWater, whichever is lower.
10.       Add nextTile to the border
11.   Check the tiles adjacent to and including nextTile. If any are no longer adjacent to an inner tile, remove them from the border.
12.   Decrement the number of tiles left to be traversed
13. End Loop
14. Return totalWater.

I find it very helpful to keep a record of which tiles have been traversed. In my implementation, I made a matrix called "traversed" which is the same size as heightMap. Any tiles that have been traversed have a 1 at the corresponding indices or a 0 if they still need to be traversed.

In my implementation, I call some variables by different names.
totalWater is total.
The number of inner tiles is numZeros
border is borderCoords.
minBorderHeight is minHeight.
