import React, { useState } from 'react';
import CipherGrid from '../components/grid';
import { words_9, words_16, words_25, words_36 } from '../cipher-words';

const CipherGame = () => {
  
  console.log('Word Lists:', {
    words_9: words_9 ? words_9.length : 'Undefined',
    words_16: words_16 ? words_16.length : 'Undefined',
    words_25: words_25 ? words_25.length : 'Undefined',
    words_36: words_36 ? words_36.length : 'Undefined'
  });

  // State variables to manage game state
  const [selectedLevel, setSelectedLevel] = useState('level_1');
  const [gridSize, setGridSize] = useState(3);
  const [cipher, setCipher] = useState('');
  const [order, setOrder] = useState([]);
  const [originalWord, setOriginalWord] = useState('');

  // Scrambling function for different levels
  const handleLevelScrambling = (selectedLevel) => {
    // Word selection based on level
    const levelWordMaps = {
      'level_1': { words: words_9, length: 9 },
      'level_2': { words: words_16, length: 16 },
      'level_3': { words: words_25, length: 25 },
      'level_4': { words: words_36, length: 36 }
    };

    // Get the appropriate word list and length
    const { words, length } = levelWordMaps[selectedLevel];

    // Select a random word
    const word = words[Math.floor(Math.random() * words.length)];

    // Validate word length
    if (word.length !== length) {
      console.error(`Word length mismatch for ${selectedLevel}`);
      return null;
    }

    const scrambleWord = (word, numParts) => {
      // Split the word into parts based on the number of parts
      const parts = [];
      const partLength = Math.floor(length / numParts);
      for (let i = 0; i < numParts; i++) {
        parts.push(word.slice(i * partLength, (i + 1) * partLength));
      }
  
      // Group letters by positions (first letters, second letters, etc.)
      const groupedLetters = [];
      for (let i = 0; i < parts[0].length; i++) {
        groupedLetters.push(parts.map(part => part[i]));
      }
  
      // Dynamically create an order array based on numParts
      const shuffledOrder = Array.from({ length: numParts }, (_, i) => i).sort(() => Math.random() - 0.5);
  
      // Reorder the groups according to the shuffled order
      const shuffledGroups = shuffledOrder.map(index => groupedLetters[index]);
  
      // Combine the letters into the scrambled word
      const scrambledWord = shuffledGroups.map(group => group.join('')).join('');
  
      return { scrambledWord, shuffledOrder };
    };
  
    switch (selectedLevel) {
      case 'level_1': {
        const { scrambledWord, shuffledOrder } = scrambleWord(word, 3);
        return {
          originalWord: word,
          cipher: scrambledWord,
          gridSize: 3,
          order: shuffledOrder
        };
      }
  
      case 'level_2': {
        const { scrambledWord, shuffledOrder } = scrambleWord(word, 4);
        return {
          originalWord: word,
          cipher: scrambledWord,
          gridSize: 4,
          order: shuffledOrder
        };
      }
  
      case 'level_3': {
        const { scrambledWord, shuffledOrder } = scrambleWord(word, 5);
        return {
          originalWord: word,
          cipher: scrambledWord,
          gridSize: 5,
          order: shuffledOrder
        };
      }
  
      case 'level_4': {
        const { scrambledWord, shuffledOrder } = scrambleWord(word, 6);
        return {
          originalWord: word,
          cipher: scrambledWord,
          gridSize: 6,
          order: shuffledOrder
        };
      };
    };
  };

  // Function to start a new game for a specific level
  const startNewGame = (level) => {
    setSelectedLevel(level);
    
    // Get scrambled word details
    const gameDetails = handleLevelScrambling(level);
    
    if (gameDetails) {
      // Update state with game details
      setGridSize(gameDetails.gridSize);
      setCipher(gameDetails.cipher);
      setOrder(gameDetails.order);
      setOriginalWord(gameDetails.originalWord);
    }
  };

  return (
    <div>
      <h1>Transposition Cipher Game</h1>
      
      {/* Level Selection Buttons */}
      <div>
        <button onClick={() => startNewGame('level_1')}>Level 1</button>
        <button onClick={() => startNewGame('level_2')}>Level 2</button>
        <button onClick={() => startNewGame('level_3')}>Level 3</button>
        <button onClick={() => startNewGame('level_4')}>Level 4</button>
      </div>

      {/* Display Game Information */}
      <p>Cipher: {cipher}</p>
      <p>Order: {order.join(', ')}</p>
      <p>Guess:</p>

      {/* Cipher Grid */}
      <CipherGrid gridSize={gridSize} targetWord={originalWord} />
    </div>
  );
};

export default CipherGame;