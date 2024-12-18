import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // Using useNavigate here
import CipherGrid from '../components/grid';
import { words_9, words_16, words_25, words_36, words_9_hints, words_16_hints, words_25_hints, words_36_hints } from '../cipher-words';
import Timer from '../components/timer';
import LeaderBoard from './LeaderBoard';

const CipherGame = () => {
  const location = useLocation();
  const navigate = useNavigate();  // useNavigate to handle navigation
  const { level, initials } = location.state || {};

  // State variables to manage game state
  const [selectedLevel, setSelectedLevel] = useState(level); // Initial level
  const [gridSize, setGridSize] = useState(3);
  const [cipher, setCipher] = useState('');
  const [order, setOrder] = useState([]);
  const [originalWord, setOriginalWord] = useState('');
  const [show, setShow] = useState(false);
  const [hint, setHint] = useState('');
  const [resetTimer, setResetTimer] = useState('false');
  const [guess, setGuess] = useState('');
  const [gameComplete, setGameComplete] = useState(false);
  const [levelStats, setLevelStats] = useState(() => {
    const savedStats = JSON.parse(localStorage.getItem('userStats')) || {};
    return savedStats[initials] || { level_1: 0, level_2: 0, level_3: 0, level_4: 0 };
  });
  const [showPopup, setShowPopup] = useState(false); 

  useEffect(() => {
    if (gameComplete) {
      const userStats = JSON.parse(localStorage.getItem('userStats')) || {};
      const currentUserStats = userStats[initials] || { level_1: 0, level_2: 0, level_3: 0, level_4: 0 };
      
      console.log(`Checking Level Completion: ${currentUserStats[selectedLevel]} games completed`);
      
      if (currentUserStats[selectedLevel] >= 3) {
        console.log('3 games completed, navigating to LeaderBoard');
        navigate('/LeaderBoard');  // Trigger navigation to Leaderboard
      } else {
        console.log('Not enough games completed yet');
      }
    }
  }, [gameComplete, initials, selectedLevel, navigate]);

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
  }, [selectedLevel]);

  // Scrambling function for different levels
  const handleLevelScrambling = (level) => {
    const levelWordMaps = {
      'level_1': { words: words_9, hints: words_9_hints, length: 9 },
      'level_2': { words: words_16, hints: words_16_hints, length: 16 },
      'level_3': { words: words_25, hints: words_25_hints, length: 25 },
      'level_4': { words: words_36, hints: words_36_hints, length: 36 }
    };

    const { words, hints, length } = levelWordMaps[level];
    const randomIndex = Math.floor(Math.random() * words.length); 

    const word = words[randomIndex];
    const hint = hints[randomIndex]; 

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
      console.log('Correct guess!');
      incrementLevelCompletion(selectedLevel); // Track level completion
      startNewGame(selectedLevel); 
    } else {
      alert('Sorry, that is not the correct word.');
    }
  };
  
  const incrementLevelCompletion = (level) => {
    const userStats = JSON.parse(localStorage.getItem('userStats')) || {};
    const currentUserStats = userStats[initials] || { level_1: 0, level_2: 0, level_3: 0, level_4: 0 };
    
    // Increment the specific level's completion count
    currentUserStats[level] = (currentUserStats[level] || 0) + 1;
    console.log(`Incrementing ${level} to ${currentUserStats[level]}`);
    
    // Update localStorage
    userStats[initials] = currentUserStats;
    localStorage.setItem('userStats', JSON.stringify(userStats));  
    
    // Update local state
    setLevelStats(currentUserStats);
    
    // Log level completion for debugging
    console.log('Updated Level Stats:', currentUserStats);
    
    // Set game complete to trigger navigation check
    setGameComplete(true);
  };

  // Start new game function
  const startNewGame = (level) => {
    setGameComplete(false);
    window.location.reload();
    setShow(false);
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
    setResetTimer(false); 
  };

  // Close the timeout popup
  const closePopup = () => {
    setShowPopup(false);
    startNewGame(selectedLevel); 
  };

  return (
    <div>
      <a href='/Levels'><button className="btn">Quit</button></a>
      <button className="btn" onClick={() => startNewGame(selectedLevel)}>Start New Game</button>
      <button className="btn" onClick={() => setShow(!show)}>Hint</button>
      <Timer resetTimer={resetTimer} handleTimeOut={handleTimeOut} />
      <h1>Cipher Game - Level {level}</h1>

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
