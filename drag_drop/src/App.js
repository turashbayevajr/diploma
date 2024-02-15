// App.js
import React, { useState } from 'react';
import Game from './components/Game';
import './styles.css';

function App() {
  const [selectedLevel, setSelectedLevel] = useState(0);

  const handleLevelClick = (level) => {
    setSelectedLevel(level - 1); // Adjust the level to be 0-indexed
  };

  const handleLevelComplete = () => {
    // Increment the selected level when the current level is completed
    setSelectedLevel((prevLevel) => prevLevel + 1);
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Levels</h2>
        <ul>
          {Array.from({ length: 10 }, (_, index) => (
            <li key={index + 1} onClick={() => handleLevelClick(index + 1)}>
              Level {index + 1}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Maqal Drop</h1>
        <Game level={selectedLevel} onLevelComplete={handleLevelComplete} />
      </div>
    </div>
  );
}

export default App;
