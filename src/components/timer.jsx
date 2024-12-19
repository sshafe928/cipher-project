import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ resetTimer, handleTimeOut }) => {
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
  
    return (
      <div>
        <h2>Time: {seconds} seconds</h2>
      </div>
    );
  };
  
  export default Timer;