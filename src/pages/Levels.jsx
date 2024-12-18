import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Levels = () => {
    const navigate = useNavigate();  // Use useNavigate instead of useHistory
    const [userInitials, setUserInitials] = useState(localStorage.getItem('userInitials') || '');

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

    return (
        <div>
            <h1>Select a Level</h1>
            <p>Welcome Detective {userInitials}</p>
            <button className="btn" onClick={() => handleLevelSelection('level_1')}>Level 1</button>
            <button className="btn" onClick={() => handleLevelSelection('level_2')}>Level 2</button>
            <button className="btn" onClick={() => handleLevelSelection('level_3')}>Level 3</button>
            <button className="btn" onClick={() => handleLevelSelection('level_4')}>Level 4</button>
        </div>
    );
};

export default Levels;