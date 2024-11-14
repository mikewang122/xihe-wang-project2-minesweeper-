import React, {useContext, useState, useEffect} from "react";
import { GameContext } from "../context/GameContext";
import Board from "../components/Board";
import { useParams } from "react-router-dom";
import { createBoard, relocateBomb } from "../utils/GameLogic";


function GamePage() {
  const { difficulty } = useParams();
  const { gameState, setGameState } = useContext(GameContext);
  const [board, setBoard] = useState([]);
  const [isFirstClick, setIsFirstClick] = useState(true); // Track if it's the first click -- safe first turn

  useEffect(() => {
    let rows, cols, numMines;
  
    if (difficulty === 'easy') {
      rows = 8;
      cols = 8;
      numMines = 10;
    } else if (difficulty === 'medium') {
      rows = 16;
      cols = 16;
      numMines = 40;
    } else if (difficulty === 'hard') {
      rows = 16;
      cols = 30; 
      numMines = 99;
    }
  
    const newBoard = createBoard(rows, cols, numMines);
    setBoard(newBoard);
  
    setGameState(prevState => ({ ...prevState, status: 'playing' }));
  }, [difficulty, setGameState]);
  

  const handleCellClick = (row, col) => {
    const newBoard = [...board];

    // If it's the first click, move the bomb to a safe location
    if (isFirstClick) {
      setIsFirstClick(false);
      if (newBoard[row][col].isBomb) {
        // Relocate the bomb to ensure the first click is safe
        relocateBomb(newBoard, row, col);
      }
    }


    if (newBoard[row][col].revealed || newBoard[row][col].flagged) return;

    newBoard[row][col].revealed = true;

    // If a bomb is clicked, reveal all bombs and set game state to "lost"
    if (newBoard[row][col].isBomb) {
      revealAllBombs(newBoard);
      setGameState({ status: 'lost' });
      alert('Game Over! You hit a bomb!');
      return;
    }

    // Logic to reveal adjacent cells if the clicked cell is not a bomb
    if (newBoard[row][col].adjacentMines === 0) {
      revealAdjacentCells(newBoard, row, col);
    }

    setBoard(newBoard);
    checkWinCondition(newBoard);
  };

  const revealAllBombs = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].isBomb) {
          board[i][j].revealed = true;
        }
      }
    }
  };

  const handleRightClick = (row, col) => {
    const newBoard = [...board];
    if (!newBoard[row][col].revealed) {
      newBoard[row][col].flagged = !newBoard[row][col].flagged; // Toggle the flagged state
      setBoard(newBoard);
    }
  };

  // Define the revealAdjacentCells function
  function revealAdjacentCells(board, row, col) {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],         [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];

    for (let [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      if (
        newRow >= 0 && newRow < board.length &&
        newCol >= 0 && newCol < board[0].length &&
        !board[newRow][newCol].revealed
      ) {
        board[newRow][newCol].revealed = true;
        if (board[newRow][newCol].adjacentMines === 0) {
          revealAdjacentCells(board, newRow, newCol);
        }
      }
    }
  }

  // Define the checkWinCondition function
  function checkWinCondition(board) {
    const allCellsRevealed = board.flat().every(cell => cell.revealed || cell.isBomb);
    if (allCellsRevealed) {
      setGameState({ status: 'won' });
      alert('You won!');
    }
  }

   return (
    <div>
      <h1>Game - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h1>
      <button onClick={() => window.location.reload()}>Reset</button>
      <Board 
        board={board} 
        handleCellClick={handleCellClick} 
        handleRightClick={handleRightClick} 
      />
      {gameState.status !== 'playing' && <p>{gameState.status === 'won' ? 'Game Over! You Won!' : 'Game Over! You Lost!'}</p>}
      
    </div>
  );
}


export default GamePage;

