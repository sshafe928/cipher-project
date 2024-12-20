import React, { useState, useEffect } from 'react';
import '../css/timer.css'

const Timer = ({ resetTimer, handleTimeOut, onTimeUpdate }) => {
    const [seconds, setSeconds] = useState(60); 
    const [isRunning, setIsRunning] = useState(true); 
  
    useEffect(() => {
      if (resetTimer) {
        setSeconds(60);
        setIsRunning(true);  
      }
    }, [resetTimer]);  
  
    useEffect(() => {
      let interval;
  
      if (isRunning && seconds > 0) {
        interval = setInterval(() => {
          setSeconds(prevSeconds => {
            const newSeconds = prevSeconds - 1;
            if (newSeconds <= 0) {
              clearInterval(interval);
              handleTimeOut();
              return 0;
            }
            // Call onTimeUpdate with current seconds
            onTimeUpdate(newSeconds);
            return newSeconds;
          });
        }, 1000);
      }
  
      return () => clearInterval(interval);
    }, [isRunning, handleTimeOut, onTimeUpdate]);
  
    return (
      <div id="timer" className={seconds <= 10 ? "warning" : ""}>
        <h2>Time: {seconds} seconds</h2>
      </div>
    );
};

export default Timer;