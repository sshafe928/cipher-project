import { useState, useEffect } from 'react';

const CipherGrid = ({ gridSize }) => {
// Dynamically create the initial grid based on gridSize
const createInitialGrid = () => {
    return Array(gridSize).fill().map(() => Array(gridSize).fill(''));
};

// State to manage the grid
const [grid, setGrid] = useState(createInitialGrid);

// Handle cell click to input letter
const handleCellClick = (rowIndex, colIndex) => {
    const letter = prompt("Enter a letter:")?.toUpperCase() || '';
    
    // Validate input (single capital letter)
    if (letter.length === 1 && /[A-Z]/.test(letter)) {
    const newGrid = grid.map((row, i) => 
        row.map((cell, j) => 
        (i === rowIndex && j === colIndex) ? letter : cell
        )
    );
    setGrid(newGrid);
    } else if (letter) {
    alert("Please enter a single capital letter.");
    }
};

// Use an effect to recreate the grid whenever the gridSize changes
useEffect(() => {
    setGrid(createInitialGrid());
}, [gridSize]);

return (
    <div 
    style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${gridSize}, 50px)`, // Dynamic columns based on gridSize
        gridTemplateRows: `repeat(${gridSize}, 50px)`, // Dynamic rows based on gridSize
        gap: '5px',
        justifyContent: 'center'
    }}
    >
    {grid.map((row, rowIndex) => 
        row.map((cell, colIndex) => (
        <div
            key={`${rowIndex}-${colIndex}`}
            style={{
            width: '50px',
            height: '50px',
            border: '1px solid #333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backgroundColor: '#f4f4f4',
            fontSize: '24px',
            fontWeight: 'bold'
            }}
            onClick={() => handleCellClick(rowIndex, colIndex)}
        >
            {cell}  {/* Display the letter in the cell */}
        </div>
        ))
    )}
    </div>
);
};

export default CipherGrid;