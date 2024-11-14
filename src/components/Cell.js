import React from 'react';
import '../styles.css';

function Cell({ cell, onClick, onRightClick }) {
  return (
    <div
      className={`cell ${cell.revealed ? (cell.isBomb ? 'bomb' : 'safe') : 'unselected'} ${cell.flagged ? 'flagged' : ''}`}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault(); // Prevent the default context menu
        onRightClick();
      }}
    >
      {cell.revealed && !cell.isBomb && cell.adjacentMines > 0 ? cell.adjacentMines : cell.revealed && cell.isBomb ? '💣' : ''}
    </div>
  );
}

export default Cell;
