import React, { useState } from 'react';

const CipherGrid = ({ gridSize, targetWord, onChange }) => {
// Initialize the grid with empty strings
const initialGrid = Array(gridSize).fill("").map(() => Array(gridSize).fill(""));
const [grid, setGrid] = useState(initialGrid);

// Handle input changes
const handleClick = (rowIndex, colIndex) => {
    const letter = prompt("Enter a letter:").toUpperCase(); // Prompt for input
    if (letter && /^[A-Z]$/.test(letter)) {
    const newGrid = grid.map((row, i) => 
        row.map((cell, j) => (i === rowIndex && j === colIndex ? letter : cell))
    );
    setGrid(newGrid);
    onChange(newGrid); // Callback to parent if you want to track the grid in the parent component
    } else {
    alert("Invalid input! Please enter a capital letter.");
    }
};

return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 50px)` }}>
    {grid.map((row, rowIndex) => 
        row.map((cell, colIndex) => (
        <div
            key={`${rowIndex}-${colIndex}`}
            style={{
            width: '50px',
            height: '50px',
            border: '1px solid black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '20px',
            backgroundColor: '#f0f0f0'
            }}
            onClick={() => handleClick(rowIndex, colIndex)}
        >
            {cell}
        </div>
        ))
    )}
    </div>
);
};

export default CipherGrid;