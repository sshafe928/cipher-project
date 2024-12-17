import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CipherGrid from '../components/grid';
import { words_9, words_16, words_25, words_36 } from '../cipher-words';
import Timer from '../components/timer';

const CipherGame = () => {
  const location = useLocation(); 
  const { level } = location.state || {};
  
  // State variables to manage game state
  const [selectedLevel, setSelectedLevel] = useState(level); // Initial level
  const [gridSize, setGridSize] = useState(3);
  const [cipher, setCipher] = useState('');
  const [order, setOrder] = useState([]);
  const [originalWord, setOriginalWord] = useState('');
  const [show, setShow] = useState(false);
  const [hint, setHint] = useState('');
  const [guess, setGuess] = useState('');
  const [resetTimer, setResetTimer] = useState(false); // New state to control timer reset
  const [gameComplete, setGameComplete] = useState(false); // Tracks if the game is complete
  const [levelStats, setLevelStats] = useState({ level_1: 0, level_2: 0, level_3: 0, level_4: 0 }); // Tracks level completions
  const [showPopup, setShowPopup] = useState(false); // To show the popup when time runs out

  useEffect(() => {
    if (gameComplete) {
      if (levelStats[selectedLevel] >= 3) {
        // Move to leaderboard when 3 games for the level are completed
        alert('Congratulations! You reached the leaderboard for this level!');
      }
    }
  }, [gameComplete, levelStats, selectedLevel]);

  useEffect(() => {
    // Trigger the scrambling logic when the level changes
    if (selectedLevel) {
      const gameDetails = handleLevelScrambling(selectedLevel);
      
      if (gameDetails) {
        setGridSize(gameDetails.gridSize);
        setCipher(gameDetails.cipher);
        setOrder(gameDetails.order);
        setOriginalWord(gameDetails.originalWord);
        setHint(gameDetails.hint);
      }
    }
  }, [selectedLevel]); // This hook runs when selectedLevel changes

  // Scrambling function for different levels
  const handleLevelScrambling = (level) => {
    const levelWordMaps = {
      'level_1': { words: words_9, length: 9 },
      'level_2': { words: words_16, length: 16 },
      'level_3': { words: words_25, length: 25 },
      'level_4': { words: words_36, length: 36 }
    };

    const { words, length } = levelWordMaps[level];
    const word = words[Math.floor(Math.random() * words.length)];

    if (word.length !== length) {
      console.error(`Word length mismatch for ${level}`);
      return null;
    }

    const scrambleWord = (word, numParts) => {
      const parts = [];
      const partLength = Math.floor(length / numParts);
      for (let i = 0; i < numParts; i++) {
        parts.push(word.slice(i * partLength, (i + 1) * partLength));
      }

      const groupedLetters = [];
      for (let i = 0; i < parts[0].length; i++) {
        groupedLetters.push(parts.map(part => part[i]));
      }

      const shuffledOrder = Array.from({ length: numParts }, (_, i) => i).sort(() => Math.random() - 0.5);
      const shuffledGroups = shuffledOrder.map(index => groupedLetters[index]);

      const scrambledWord = shuffledGroups.map(group => group.join('')).join('');
      return { scrambledWord, shuffledOrder };
    };

    switch (level) {
      case 'level_1':
        const { scrambledWord: word1, shuffledOrder: order1 } = scrambleWord(word, 3);
        return { originalWord: word, cipher: word1, gridSize: 3, order: order1, hint: hint };
      case 'level_2':
        const { scrambledWord: word2, shuffledOrder: order2 } = scrambleWord(word, 4);
        return { originalWord: word, cipher: word2, gridSize: 4, order: order2, hint: hint };
      case 'level_3':
        const { scrambledWord: word3, shuffledOrder: order3 } = scrambleWord(word, 5);
        return { originalWord: word, cipher: word3, gridSize: 5, order: order3, hint: hint };
      case 'level_4':
        const { scrambledWord: word4, shuffledOrder: order4 } = scrambleWord(word, 6);
        return { originalWord: word, cipher: word4, gridSize: 6, order: order4, hint: hint };
      default:
        return null;
    }
  };

  const checkWord = () => {
    // Compare guess with original word
    if (guess.toLowerCase() === originalWord.toLowerCase()) {
      alert('Congratulations! You guessed the word correctly.');
      incrementLevelCompletion(selectedLevel); // Track level completion
      startNewGame(selectedLevel); // Start new game after correct guess
    } else {
      alert('Sorry, that is not the correct word.');
    }
  };

  // Increment level completion
  const incrementLevelCompletion = (level) => {
    setLevelStats(prevState => {
      const newStats = { ...prevState };
      newStats[level] += 1;
      return newStats;
    });
  };

  // Start new game function
  const startNewGame = (level) => {
    setSelectedLevel(level);
    setResetTimer(true); 
    setGameComplete(false); 
    setGuess(''); 

    const gameDetails = handleLevelScrambling(level);

    if (gameDetails) {
      setGridSize(gameDetails.gridSize);
      setCipher(gameDetails.cipher);
      setOrder(gameDetails.order);
      setOriginalWord(gameDetails.originalWord);
      setHint(gameDetails.hint);
    }
  };

  // Show the "You ran out of time" popup
  const handleTimeOut = () => {
    setShowPopup(true);
    setResetTimer(false); // Stop the timer
  };

  // Close the timeout popup
  const closePopup = () => {
    setShowPopup(false);
    startNewGame(selectedLevel); // Start a new game
  };

  return (
    <div>
      <a href='/Levels'><button className="btn">Quit</button></a>
      <button className="btn" onClick={() => startNewGame(selectedLevel)}>Start New Game</button>
      <button className="btn" onClick={() => setShow(!show)}>Hint</button>
      <Timer resetTimer={resetTimer} handleTimeOut={handleTimeOut} />

      <h1>Transposition Cipher Game</h1>

      {/* Display Game Information */}
      <p>Cipher: {cipher}</p>
      <p>Order: {order.join(', ')}</p>
      <p>Guess:</p>
      <input type="text" placeholder="Enter your guess" onChange={(e) => setGuess(e.target.value)} />
      <button className="btn" onClick={checkWord}>Submit</button>
      
      {show && <p>{hint}</p>}

      {/* Cipher Grid */}
      <CipherGrid gridSize={gridSize} targetWord={originalWord} />

      {/* Timeout Popup */}
      {showPopup && (
        <div className="popup">
          <h2>You ran out of time!</h2>
          <a href="/Levels"><button className="btn">Back</button></a>
          <button onClick={() => closePopup()}>Reset</button>
        </div>
      )}
    </div>
  );
};

export default CipherGame;
