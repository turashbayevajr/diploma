// Sentence.js
import React from 'react';
import { useDrag } from 'react-dnd';

const Word = ({ word, index }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'WORD',
    item: { word },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`word ${index === 0 ? 'first-word' : ''}`} // Add a class for the first word
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
    >
      {word}
    </div>
  );
};

const Sentence = ({ sentence }) => {
  return (
    <div>
      {sentence.map((word, index) => (
        <Word key={index} word={word} index={index} />
      ))}
    </div>
  );
};

export default Sentence;
