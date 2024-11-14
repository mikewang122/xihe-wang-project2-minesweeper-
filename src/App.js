import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RulesPage from './pages/RulesPage';
import GamePage from './pages/GamePage';
import Header from './components/Header';
import { GameProvider } from './context/GameContext';
import './styles.css';

function App() {
  return (
    <GameProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/game/:difficulty" element={<GamePage />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
