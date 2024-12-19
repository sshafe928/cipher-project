import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/levels.css'

const Levels = () => {
    const navigate = useNavigate();  // Use useNavigate instead of useHistory
    const [userInitials, setUserInitials] = useState(localStorage.getItem('userInitials') || '');
    const [typingEffect, setTypingEffect] = useState(''); // Holds the text for typing effect

    useEffect(() => {
        if (!userInitials) {
            // If no name is set, redirect to the name page
            navigate('/'); 
        }
    }, [userInitials, navigate]);

    const handleLevelSelection = (level) => {
        // Ensure that 'userInitials' is correctly stored in localStorage
        if (userInitials) {
            navigate('/CipherGame', { state: { level, initials: userInitials } });  // Navigate to CipherGame with the state
        } else {
            console.error("User initials not found.");
        }
    };

    useEffect(() => {
        const correctMessage = `Welcome Detective ${userInitials}`;
        setTypingEffect(''); 
        let index = 0;

        const typingInterval = setInterval(() => {
            if (index >= correctMessage.length) {
                clearInterval(typingInterval);
                return;
            }

            setTypingEffect(prevText => correctMessage.slice(0, index + 1));
            index++;
        }, 85);

        // Cleanup
        return () => {
            clearInterval(typingInterval);
        };
    }, [userInitials]); // Only re-run when userInitials changes

    return (
        <>
        <a href="/Name"><button id="back" className="btn">Back</button></a>
        <div className='parchment'>
            <div>
                
                <h1 className='level-select'>Select a Level</h1>
                <p className='level-detective'>{typingEffect}</p>
                <img src="https://res.cloudinary.com/dy2nnbnek/image/upload/v1734599691/DooFi_Consulting_detective_with_pipe_and_magnifying_glass_silhouette_-removebg-preview_qozhke.png" alt="detective" id='detective' />
                <div className="level-grid">
                    <div className="folder" onClick={() => handleLevelSelection('level_1')}>
                        <button id='level-bubble' className="btn">Level 1</button>
                        <p className="desc">3 x 3 GRID</p>
                    </div>
                    <div className="folder" onClick={() => handleLevelSelection('level_2')}>
                        <button id='level-bubble' className="btn">Level 2</button>
                        <p className="desc">4 x 4 GRID</p>
                    </div>
                    <div className="folder" onClick={() => handleLevelSelection('level_3')}>
                        <button id='level-bubble' className="btn">Level 3</button>
                        <p className="desc">5 x 5 GRID</p>
                    </div>
                    <div className="folder" onClick={() => handleLevelSelection('level_4')}>
                        <button id='level-bubble' className="btn">Level 4</button>
                        <p className="desc">6 x 6 GRID</p>
                    </div>
                </div>


                
                
                
            </div>
        </div>
        </>
    );
};

export default Levels;