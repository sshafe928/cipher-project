import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/name.css';

// List of bad words to block 
const badWords = ['ASS', 'SEX', 'FAG','TIT']; 

const Name = () => {
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Handle name input change
    const handleNameChange = (e) => {
        let inputValue = e.target.value.toUpperCase(); // Ensure input is uppercase

        // Remove any non-letter characters and dots before processing
        inputValue = inputValue.replace(/[^A-Za-z]/g, '');
        // Check if the input contains any bad words
        if (badWords.some((word) => inputValue.includes(word))) {
            setErrorMessage('Please avoid using inappropriate words');
            setName(''); // Clear the input field if a bad word is detected
            return;
        } else {
            setErrorMessage('');
        }

        if (inputValue.length <= 3) {
            let dottedValue = inputValue.split('').join('.'); 
            setName(dottedValue);
        }
    };

    // Handle done button click
    const handleDone = () => {
        if (name) {
            // Remove trailing dot (if present) before saving
            const cleanName = name.endsWith('.') ? name.slice(0, -1) : name;

            // Store the initials in localStorage
            localStorage.setItem('userInitials', cleanName);

            // Redirect to Levels page
            navigate('/Levels');
        } else {
            alert("Please enter your name");
        }
    };

    return (
        <>
            <a href="/"><button id='back' className="btn">Back</button></a>
            <div className='parchment'>
                <h1 className='name'>Initial Your Detective</h1>
                <div className='name-input'>
                    <input
                        type="text"
                        placeholder="Initial"
                        value={name}
                        onChange={handleNameChange}
                        maxLength={5} // Allow max of 3 letters with dots (3 + 2 dots)
                    />
                    {errorMessage && <p className="error">{errorMessage}</p>} {/* Display error for bad words */}
                    <button className="btn" id='submit-name' onClick={handleDone}>Done</button>
                </div>
            </div>
        </>
    );
};

export default Name;
