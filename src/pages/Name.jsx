import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Name = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();  // Use useNavigate instead of useHistory

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDone = () => {
        if (name) {
            // Store the initials in localStorage
            localStorage.setItem('userInitials', name);
            // Optionally, you can initialize the stats for this user
            const savedStats = JSON.parse(localStorage.getItem('userStats')) || {};
            if (!savedStats[name]) {
                savedStats[name] = { level_1: 0, level_2: 0, level_3: 0, level_4: 0 };
                localStorage.setItem('userStats', JSON.stringify(savedStats));
            }
            // Redirect to Levels page
            navigate('/Levels');  // Use navigate() instead of history.push
        } else {
            alert("Please enter your name");
        }
    };

    return (
        <>
            <div>
                <h1>Name Your Detective</h1>
            </div>
            <div>
                <a href="/"><button className="btn">Back</button></a>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleNameChange}
                />
                <button className="btn" onClick={handleDone}>Done</button>
            </div>
        </>
    );
};

export default Name;