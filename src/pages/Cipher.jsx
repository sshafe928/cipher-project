import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';  
import CipherGrid from '../components/grid';
import Timer from '../components/timer';
import '../css/cipher.css'
import { words_9, words_16, words_25, words_36, words_9_hints, words_16_hints, words_25_hints, words_36_hints } from '../cipher-words';

const CipherGame = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { level, initials } = location.state || {}; 
  const [selectedLevel, setSelectedLevel] = useState(level || 'level_1'); 
  const [gridSize, setGridSize] = useState(3);
  const [cipher, setCipher] = useState('');
  const [order, setOrder] = useState([]);
  const [originalWord, setOriginalWord] = useState('');
  const [show, setShow] = useState(false);
  const [hint, setHint] = useState('');
  const [resetTimer, setResetTimer] = useState(false);
  const [guess, setGuess] = useState('');
  const [gameComplete, setGameComplete] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [totalGamesCompleted, setTotalGamesCompleted] = useState(() => {
    const savedStats = JSON.parse(localStorage.getItem('userStats')) || {};
    return savedStats.totalGamesCompleted || 0;
  });
  const [showPopup, setShowPopup] = useState(false);

  // Track remaining time for each puzzle
  const [timeLeftForPuzzle, setTimeLeftForPuzzle] = useState([]);
  const [seconds, setSeconds] = useState(60);

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

  useEffect(() => {
    // Set start time when component mounts or when a new game starts
    setStartTime(Date.now());
  }, [selectedLevel]);

  useEffect(() => {
    const storedInitials = localStorage.getItem('userInitials');
    console.log('Stored initials:', storedInitials);
    if (!storedInitials && location.state?.initials) {
      localStorage.setItem('userInitials', location.state.initials);
    }
  }, [location.state?.initials]);

  

  
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

  const handleTimeUpdate = (secondsRemaining) => {
    if (startTime) {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      setTotalTimeSpent(prevTotal => prevTotal + timeSpent);
    }
  };

  const checkWord = async () => {
    if (guess.toLowerCase() === originalWord.toLowerCase()) {
      alert('Congratulations! You guessed the word correctly.');
      setGameComplete(true);  
      incrementGameCompletion();

      if (totalGamesCompleted >= 2) {
        // Get user initials
        const userInitials = localStorage.getItem('userInitials');
        console.log('Retrieved initials:', userInitials); // Debug log
        
        // Calculate time
        const currentGameTime = 60 - seconds;
        const finalTotalTime = timeLeftForPuzzle.reduce((sum, time) => sum + time, 0) + currentGameTime;
        console.log('Calculated time:', finalTotalTime); // Debug log
        
        // Calculate score
        const calculatedScore = Math.max(0, (240 - finalTotalTime) * 10);
        console.log('Calculated score:', calculatedScore); // Debug log

        const dataToSubmit = {
          name: String(userInitials || 'Unknown'), // Ensure it's a string
          score: Number(calculatedScore), // Ensure it's a number
          time: Number(finalTotalTime), // Ensure it's a number
          id: Date.now(),
          level: String(selectedLevel), // Ensure it's a string
        };

        console.log('Final data being sent:', dataToSubmit); // Debug log

        try {
          const response = await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(dataToSubmit)
          });

          const responseText = await response.text();
          console.log('Raw response:', responseText); // Debug log

          let result;
          try {
            result = JSON.parse(responseText);
          } catch (e) {
            console.error('Failed to parse response:', e);
          }

          console.log('Parsed response:', result); // Debug log

          if (response.ok) {
            alert('Data saved successfully');
            localStorage.setItem('userStats', JSON.stringify({ totalGamesCompleted: 0 }));
            setTotalGamesCompleted(0);
            navigate('/Leaderboard', { state: { level: selectedLevel } });
          } else {
            throw new Error(`Server responded with status: ${response.status}`);
          }
        } catch (error) {
          console.error('Error saving data:', error);
          alert(`Failed to save data: ${error.message}`);
        }
      } else {
        startNewGame(selectedLevel);
      }
    } else {
      alert('Sorry, that is not the correct word.');
    }
  };
  

  const incrementGameCompletion = () => {
    const userStats = JSON.parse(localStorage.getItem('userStats')) || {};
    const updatedTotalGames = (userStats.totalGamesCompleted || 0) + 1;

    userStats.totalGamesCompleted = updatedTotalGames;
    localStorage.setItem('userStats', JSON.stringify(userStats));

    setTotalGamesCompleted(updatedTotalGames);
  };

  const startNewGame = (level) => {
    setGameComplete(false);
    window.location.reload();
    setShow(false);
    setGuess('');
    setStartTime(Date.now()); 

    const gameDetails = handleLevelScrambling(level);
    if (gameDetails) {
      setGridSize(gameDetails.gridSize);
      setCipher(gameDetails.cipher);
      setOrder(gameDetails.order);
      setOriginalWord(gameDetails.originalWord);
      setHint(gameDetails.hint);
    }
  };

  const handleTimeOut = () => {
    setShowPopup(true);
    setResetTimer(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    startNewGame(selectedLevel);
  };

  return (
    <>
      <div className="btn-nav">
          <a href='/Levels'>
            <button id="quit" className="btn">Quit</button>
          </a>
          <button id="start-new-game" className="btn" onClick={() => startNewGame(selectedLevel)}>Start New Game</button>
          <button id="hint" className="btn" onClick={() => setShow(!show)}>Hint</button>
      </div>

      <div className='parchment'>
        
      <Timer resetTimer={resetTimer} handleTimeOut={handleTimeOut} onTimeUpdate={(timeLeft) => { setSeconds(timeLeft); handleTimeUpdate(timeLeft);}}/>

        <h1 className="cover">Transposition Cipher Game</h1>
        <div id='grid'>
            <CipherGrid gridSize={gridSize} targetWord={originalWord} />
        </div>

        <div id="grid-info">
            <p>Cipher:  {cipher}</p>
            <p>Order:  {order.join(', ')}</p>
            <div id='#guess'>
              <p>Guess: </p>
              <div className="submit-input">
              <input type="text" id="guess-input" placeholder="" onChange={(e) => setGuess(e.target.value)} />
              </div>
            </div>

              <div className='guess-btn'>
              <button id="submit-btn" onClick={checkWord}>Submit</button>
            </div>
        </div>

        {show && <p>{hint}</p>}

        

        {showPopup && (
          <div className="popup">
            <h2>You ran out of time!</h2>
            <a href="/Levels"><button className="btn">Back</button></a>
            <button onClick={() => closePopup()}>Reset</button>
          </div>
        )}
      </div>
    </>
  );
};

export default CipherGame;
