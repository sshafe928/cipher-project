import React, { useState, useEffect } from 'react';

const Timer = ({ resetTimer, handleTimeOut }) => {
const [seconds, setSeconds] = useState(50); // Timer starts at 50 seconds
const [isRunning, setIsRunning] = useState(true); // Timer should always run unless reset

useEffect(() => {
    let interval;

    // Reset the timer when `resetTimer` is triggered
    if (resetTimer) {
    setSeconds(50); // Reset the timer to 50 seconds
    setIsRunning(true);
    }

    // Start the countdown if the timer is running
    if (isRunning) {
    interval = setInterval(() => {
        setSeconds((prevSeconds) => {
        if (prevSeconds === 1) {
            handleTimeOut(); // Trigger timeout event when timer hits 0
            clearInterval(interval); // Stop the timer
            return 0; // Timer is now at 0
        }
        return prevSeconds - 1;
        });
    }, 1000);
    } else {
    clearInterval(interval); // Clear the interval if the timer is stopped
    }

    return () => clearInterval(interval); // Clean up on component unmount or update

}, [isRunning, resetTimer, handleTimeOut]);

return (
    <div>
    <h2>Time: {seconds} seconds</h2>
    </div>
);
};

export default Timer;
