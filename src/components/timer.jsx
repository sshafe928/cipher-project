import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ resetTimer, handleTimeOut }) => {
    const [seconds, setSeconds] = useState(50);  // Timer starts at 50 seconds
    const [isRunning, setIsRunning] = useState(true);  // Timer should always run unless reset
  
    useEffect(() => {
      if (resetTimer) {
        // Reset the timer to 50 seconds when resetTimer is true
        setSeconds(50);
        setIsRunning(true);  // Restart the countdown
      }
    }, [resetTimer]);  // Dependency on resetTimer, will trigger when resetTimer changes
  
    useEffect(() => {
      let interval;
  
      // Start the countdown if the timer is running
      if (isRunning) {
        interval = setInterval(() => {
          setSeconds((prevSeconds) => {
            if (prevSeconds === 1) {
              handleTimeOut();
              clearInterval(interval);
              return 0;  // Stop the countdown when it reaches zero
            }
            return prevSeconds - 1;
          });
        }, 1000);
      } else {
        clearInterval(interval);
      }
  
      return () => clearInterval(interval);  // Cleanup interval on unmount
    }, [isRunning, handleTimeOut]);
  
    return (
      <div>
        <h2>Time: {seconds} seconds</h2>
      </div>
    );
  };
  
  export default Timer;