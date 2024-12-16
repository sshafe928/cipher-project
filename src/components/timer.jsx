
import React, { useState, useEffect } from 'react';


const Timer = () => {
    const [time, setTime] = useState(90);
    useEffect(() => {
        const timer = setInterval(() => {
            if (time > 0) {
                setTime(time - 1);
            } else {
                clearInterval(timer);
            }
        }, 1000);
    })


    return(
        <div>
            <h2>Time Remaining: {time} seconds</h2>
        </div>
    )
}

export default Timer;

