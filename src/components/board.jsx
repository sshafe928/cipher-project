import React, { useState, useEffect } from 'react';

// Sample data array for people
const sampleData = [
{ name: 'John Doe', time: '12:30', score: 150 },
{ name: 'Jane Smith', time: '10:15', score: 200 },
{ name: 'Mark Brown', time: '15:45', score: 100 },
{ name: 'Lucy Green', time: '11:00', score: 180 },
{ name: 'Charlie Black', time: '09:45', score: 210 }
];

const Board = () => {
// Sort the sample data by score in descending order
const [leaderboard, setLeaderboard] = useState([]);

useEffect(() => {
    const sortedLeaderboard = [...sampleData].sort((a, b) => b.score - a.score);
    setLeaderboard(sortedLeaderboard);
}, []);

return (
    <div>
    <h1>Leaderboard</h1>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
        <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rank</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Time</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Score</th>
        </tr>
        </thead>
        <tbody>
        {leaderboard.map((player, index) => (
            <tr key={index}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{player.name}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{player.time}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{player.score}</td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
);
};

export default Board;