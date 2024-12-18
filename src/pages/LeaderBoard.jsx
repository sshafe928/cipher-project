import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';  // Import useNavigate and useLocation hooks
import Board from '../components/board';

const LeaderBoard = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const { level } = location.state || {};  

  // Function to determine the next level
  const getNextLevel = (currentLevel) => {
    switch (currentLevel) {
      case 'level_1':
        return 'level_2';
      case 'level_2':
        return 'level_3';
      case 'level_3':
        return 'level_4';
      case 'level_4':
        return 'level_1';  
      default:
        return 'level_1'; 
    }
  };

  // Handle level selection and navigation
  const handleLevelSelection = () => {
    const nextLevel = getNextLevel(level); 
    const userInitials = localStorage.getItem('userInitials'); 

    if (userInitials) {
      console.log(nextLevel);
      // Navigate to the CipherGame with the next level and user initials
      navigate('/CipherGame', { state: { level: nextLevel, initials: userInitials } });
    } else {
      console.error("User initials not found.");
    }
  };

  return (
    <>
      <div>{level} LeaderBoard</div>
      <a href="/Levels">
        <button className="btn">Back</button>
      </a>
      <button className="btn" onClick={handleLevelSelection}>Next</button>
      <Board level={level} />
    </>
  );
};

export default LeaderBoard;
