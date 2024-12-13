import React, { useState } from 'react';
import CipherGrid from '../components/grid';
import {words_9, words_16, words_25, words_36} from '../../cipher-words'

const CipherGame = () => {
  const [gridSize] = useState(''); 
  const [targetWord] = useState(''); 
  const [randomItem, setRandomItem] = useState(null);
  
  const handleGridChange = (newGrid) => {
    console.log("Current Grid:", newGrid);
  };

  const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length - 1)];
  };



  const handleArraySelection = () => {
    switch (selectedArray) {
      
      case 'level_1':
        parts = [];
        word = getRandomItem(words_9)
        setRandomItem(word)
        for (let i = 0; i < 3; i++){
          parts.push(word.slice(i * 3, (i + 1) * 3));
        }
        
        return gridSize = 3, targetword = word, order = 

      case 'level_2':
        parts = [];
        word = getRandomItem(words_16)
        setRandomItem(word)
        for (let i = 0; i < 4; i++){
          parts.push(word.slice(i * 4, (i + 1) * 4));
        }
        return gridSize = 4, targetword = word, order = 

      case 'level_3':
        parts = [];
        word = getRandomItem(words_25)
        setRandomItem(word)
        for (let i = 0; i < 5; i++){
          parts.push(word.slice(i * 5, (i + 1) * 5));
        }
        return gridSize = 5, targetword = word, order =
      

      case 'level_4':
        parts = [];
        word = getRandomItem(words_36)
        setRandomItem(word)
        for (let i = 0; i < 6; i++){
          parts.push(word.slice(i * 6, (i + 1) * 6));
        }
        return gridSize = 6, targetword = word, order = 

      default:
        return <li>No array selected</li>;
    }
  };




  return (
    <div>
      <h1>Transposition Cipher Game</h1>
      <p>Cipher:{cipher}</p>
      <p>Order:{order}</p> 
      <CipherGrid gridSize={gridSize} targetWord={targetWord} onChange={handleGridChange} />
    </div>
  );
};

export default CipherGame;
