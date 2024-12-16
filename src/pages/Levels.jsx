import React from 'react';
import { useNavigate } from 'react-router-dom';


const Levels = () => {
    const navigate = useNavigate();

    const handleClick = (level) => {
        navigate('/Cipher-game', { state: { level } });
    };

    return (
        <>
            <a href="/Name"><button className="btn">Back</button></a>
                        <div>
                <button onClick={() => handleClick('level_1')}>Level 1</button>
                <button onClick={() => handleClick('level_2')}>Level 2</button>
                <button onClick={() => handleClick('level_3')}>Level 3</button>
                <button onClick={() => handleClick('level_4')}>Level 4</button>
            </div>
        </>
    );
};

export default Levels;