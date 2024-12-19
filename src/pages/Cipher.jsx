import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';  
import CipherGrid from '../components/grid';
import Timer from '../components/timer';
import '../css/cipher.css'

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
  const [totalGamesCompleted, setTotalGamesCompleted] = useState(() => {
    const savedStats = JSON.parse(localStorage.getItem('userStats')) || {};
    return savedStats.totalGamesCompleted || 0;
  });
  const [showPopup, setShowPopup] = useState(false);

  // Track remaining time for each puzzle
  const [timeLeftForPuzzle, setTimeLeftForPuzzle] = useState([]);

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

  
  const handleLevelScrambling = (level) => {
    // ... existing code for scrambling the words
  };

  const handleTimeUpdate = (timeLeft) => {
    // Calculate the time spent on the current puzzle
    const timeSpent = 60 - timeLeft;
  
    // Store the time spent for the current puzzle
    setTimeLeftForPuzzle(prev => {
      const newTimeLeft = [...prev];
      newTimeLeft.push(timeSpent); // Store the time spent, not the remaining time
      return newTimeLeft;
    });
  };

  const checkWord = async () => {
    if (guess.toLowerCase() === originalWord.toLowerCase()) {
      alert('Congratulations! You guessed the word correctly.');
      setGameComplete(true);  
      incrementGameCompletion();
  
      if (totalGamesCompleted > 2) {
        // Calculate the total time spent on all puzzles
        const timeSpent = timeLeftForPuzzle.reduce((sum, time) => sum + time, 0); 
  
        // Calculate score (time spent * 10)
        const score = (240 - timeSpent) * 10
  
        try {
          // Send the score, initials, and other data to the backend
          let result = await fetch('http://localhost:5000/users', {
            method: 'POST',
            body: JSON.stringify({
              initials, 
              score,     
              timeSpent, 
              id: Date.now(), 
            }),
            headers: { 'Content-Type': 'application/json' },
          });
  
          result = await result.json();
  
          // Log and alert on success
          console.log(result);
          if (result) {
            alert('Data saved successfully');
          }
  
          // Reset the game completion count and navigate to leaderboard
          localStorage.setItem('userStats', JSON.stringify({ totalGamesCompleted: 0 }));
          setTotalGamesCompleted(0);
          navigate('/Leaderboard', { state: { level: selectedLevel } });
        } catch (error) {
          console.error('Error saving data:', error);
          alert('Failed to save data.');
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
        
        <Timer resetTimer={resetTimer} handleTimeOut={handleTimeOut} id="timer" />

        <h1 className="cover">Transposition Cipher Game</h1>
        <div id='grid'>
            <CipherGrid gridSize={gridSize} targetWord={originalWord} />
        </div>

        <div id="grid-info">
            <p>Cipher:  {cipher}</p>
            <p>Order:  {order.join(', ')}</p>
            <p>Guess: </p>

              <div className="submit-input">
              <input type="text" id="guess-input" placeholder="" onChange={(e) => setGuess(e.target.value)} />
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
