import React from 'react';

const RulesPage = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Minesweeper Rules</h1>
            <p>Minesweeper is a single-player puzzle game. The objective is to clear a rectangular board containing hidden "mines" without detonating any of them, with help from clues about the number of neighboring mines in each field.</p>
            <h2>How to Play</h2>
            <ul>
                <li>Click on a cell to reveal it.</li>
                <li>If you reveal a mine, you lose the game.</li>
                <li>If you reveal an empty cell, it will show a number indicating how many mines are adjacent to it.</li>
                <li>Use the numbers to deduce where the mines are located.</li>
                <li>Right-click on a cell to flag it as a mine.</li>
                <li>Clear all non-mine cells to win the game.</li>
            </ul>
            <h2>Tips</h2>
            <ul>
                <li>Start by clicking on cells in the corners or edges.</li>
                <li>Use flags to mark cells you suspect contain mines.</li>
                <li>Plan your moves carefully to avoid detonating a mine.</li>
            </ul>
        </div>
    );
};

export default RulesPage;