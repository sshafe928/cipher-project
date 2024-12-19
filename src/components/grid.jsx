import { useState, useEffect } from 'react';
import '../css/grid.css';

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
    className="cipher-grid"
    style={{ gridTemplateColumns: `repeat(${gridSize}, 50px)`, gridTemplateRows: `repeat(${gridSize}, 50px)` }}
>
    {grid.map((row, rowIndex) => 
        row.map((cell, colIndex) => (
        <div
            key={`${rowIndex}-${colIndex}`}
            className={`cipher-cell ${cell ? 'filled' : ''}`} 
            onClick={() => handleCellClick(rowIndex, colIndex)}
        >
            {cell}
        </div>
        ))
    )}
</div>
);
};

export default CipherGrid;