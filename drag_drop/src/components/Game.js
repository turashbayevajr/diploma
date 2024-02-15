// Game.js
import React, { useState, useEffect } from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sentence from './Sentence';
import '../styles.css';

const levels = [
  {
    sentence: ['болсын', 'да', 'жауда', 'үйің', 'бір'],
    correctSentence: ['жауда', 'да', 'бір', 'үйің', 'болсын'],
  },
  {
    sentence: ['өтірік', 'шаршатады', 'ақылды'],
    correctSentence: ['ақылды', 'өтірік', 'шаршатады'],
  },
  {
    sentence: ['Сөз', 'бастайды', 'мың', 'Шешен',',','тар', 'батыр', 'қол', 'жерде' ,'бастайды'],
    correctSentence: ['Батыр', 'мың', 'қол', 'бастайды', ',',
        'Шешен', 'тар', 'жерде', 'сөз', 'бастайды'],
  },
  {
    sentence: ['білім', 'ақыл','тозбайды', ',', 'азбайды'],
    correctSentence: ['Ақыл', 'азбайды',',', 'білім', 'тозбайды'],
  },
  {
    sentence: ['қадірі', 'алтынның','жоқ', 'бар', 'Қолда'],
    correctSentence: ['Қолда', 'бар','алтынның', 'қадірі', 'жоқ'],
  },
];
const Game = ({ level, onLevelComplete }) => {
    const [currentSentence, setCurrentSentence] = useState([]);
    const [droppedWords, setDroppedWords] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
  
    useEffect(() => {
      setCurrentSentence(levels[level].sentence);
      setDroppedWords([]);
      setIsCorrect(false);
    }, [level]);
  
    useEffect(() => {
      // Check if the level is correct and trigger the next level
      if (isCorrect && level < levels.length - 1) {
        onLevelComplete();
      }
    }, [isCorrect, level, onLevelComplete]);
  
    const handleDrop = (item) => {
      const newSentence = currentSentence.filter((word) => word !== item.word);
      setCurrentSentence([...newSentence]);
      setDroppedWords((prev) => [...prev, item.word]);
    };
  
    const checkSentence = () => {
      const correctSentence = levels[level].correctSentence;
      const isCorrect = JSON.stringify(droppedWords) === JSON.stringify(correctSentence);
      setIsCorrect(isCorrect);
  
      const alertMessage = isCorrect ? 'Well done!' : 'Try again. The sentence is not correct.';
      alert(alertMessage);
  
      // Reset the current level if the order is not correct
      if (!isCorrect) {
        setCurrentSentence(levels[level].sentence);
        setDroppedWords([]);
        setIsCorrect(false);
      }
  
      // Trigger the next level if the current level is correct
      if (isCorrect && level < levels.length - 1) {
        onLevelComplete();
      }
    };
  
    const handleReset = () => {
      // Reset the current level
      setCurrentSentence(levels[level].sentence);
      setDroppedWords([]);
      setIsCorrect(false);
    };
  
    const [, drop] = useDrop({
      accept: 'WORD',
      drop: (item) => handleDrop(item),
    });
  
    return (
      <DndProvider backend={HTML5Backend}>
        <div>
          <div className="drop-zone" ref={drop}>
            {/* Drop Zone */}
            {droppedWords.map((word, index) => (
              <span key={index} className="word">
                {word}
              </span>
            ))}
          </div>
          <Sentence sentence={currentSentence} />
        </div>
        <button onClick={checkSentence}>Check</button>
        <button onClick={handleReset}>Reset</button>
        {isCorrect && <p className="message well-done">Well done!</p>}
        {isCorrect === false && <p className="message try-again"></p>}
      </DndProvider>
    );
  };
  
  export default Game;