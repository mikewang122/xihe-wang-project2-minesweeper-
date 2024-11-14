import React from 'react';
import Cell from './Cell';
import '../styles.css';

function Board({ board, handleCellClick, handleRightClick }) {

  const numRows = board.length;
  const numCols = numRows > 0 ? board[0].length : 0;


  return (
    <div 
      className="board" 
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numCols}, 30px)`, // Adjust columns dynamically
        gridTemplateRows: `repeat(${numRows}, 30px)`, // Adjust rows dynamically if needed
        gridGap: '2px',
        margin: '0 auto',
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell 
            key={`${rowIndex}-${colIndex}`} 
            cell={cell} 
            onClick={() => handleCellClick(rowIndex, colIndex)} 
            onRightClick={() => handleRightClick(rowIndex, colIndex)} 
          />
        ))
      )}
    </div>
  );
}

export default Board;