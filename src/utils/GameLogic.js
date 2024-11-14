// utils/gameLogic.js
export function createBoard(rows, cols, numMines) {
  // Step 1: Initialize an empty m * m board
  let board = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      revealed: false,
      isBomb: false,
      adjacentMines: 0,
      flagged: false, // Add flagged property for marking bombs
    }))
  );

  // Step 2: Randomly place the mines without overlapping
  let placedMines = 0;
  while (placedMines < numMines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);

    // Place a mine only if the selected cell does not already have one
    if (!board[row][col].isBomb) {
      board[row][col].isBomb = true;
      placedMines++;
    }
  }

  // Step 3: Calculate adjacent mines for each cell
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!board[row][col].isBomb) {
        board[row][col].adjacentMines = countAdjacentMines(board, row, col);
      }
    }
  }

  return board;
}

// Helper function to reveal adjacent cells when a cell with no adjacent mines is clicked
export function relocateBomb(board, safeRow, safeCol) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (!board[i][j].isBomb && (i !== safeRow || j !== safeCol)) {
        board[i][j].isBomb = true; // Place a bomb in the first non-bomb cell found
        board[safeRow][safeCol].isBomb = false; // Remove the bomb from the clicked cell
        return;
      }
    }
  }
}

// Helper function to count adjacent mines for a given cell
function countAdjacentMines(board, row, col) {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],         [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  let count = 0;
  for (let [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;
    if (
      newRow >= 0 && newRow < board.length &&
      newCol >= 0 && newCol < board[0].length &&
      board[newRow][newCol].isBomb
    ) {
      count++;
    }
  }
  return count;
}
