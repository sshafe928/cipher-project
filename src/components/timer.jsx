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
  
      // Start the countdown if the timer is running
      if (isRunning) {
        interval = setInterval(() => {
          setSeconds((prevSeconds) => {
            if (prevSeconds === 1) {
              handleTimeOut();
              clearInterval(interval);
              return 0; 
            }
            return prevSeconds - 1;
          });
        }, 1000);
      } else {
        clearInterval(interval);
      }
  
      return () => clearInterval(interval);
    }, [isRunning, handleTimeOut]);
  
    useEffect(() => {
      if (onTimeUpdate) {
        onTimeUpdate(seconds);
      }
    }, [seconds, onTimeUpdate]); 
  
    return (
      <div id="timer" className={seconds <= 10 ? "warning" : ""}>
            <h2>Time: {seconds} seconds</h2>
        </div>
    );
};

export default Timer;
