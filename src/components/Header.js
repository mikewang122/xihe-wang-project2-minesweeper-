import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">Minesweeper</Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/rules" className="nav-link">Rules</Link>
          <Link to="/game/easy" className="nav-link">Easy</Link>
          <Link to="/game/medium" className="nav-link">Medium</Link>
          <Link to="/game/hard" className="nav-link">Hard</Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
