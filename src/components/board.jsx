import React, { useState, useEffect } from 'react';

const Board = ({ level }) => {
const [leaderboard, setLeaderboard] = useState([]);

useEffect(() => {
    const fetchLeaderboard = async () => {
    try {
        const response = await fetch(`http://localhost:5000/users/leaderboard-info`);
        const data = await response.json();
        
        // Filter by level and sort by score
        const filteredData = data
        .filter(player => player.level === level)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10); // Only take top 10
        
        setLeaderboard(filteredData);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
    }
    };

    fetchLeaderboard();
}, [level]);

// Format time to mm:ss
const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

return (
    <div id="leaderboard-container">
    <h1>Top 10 Players</h1>
    <div id="level">{level.replace('_', ' ').toUpperCase()}</div>
    <table>
        <thead>
        <tr>
            <th>RANK</th>
            <th>NAME</th>
            <th>SCORE</th>
        </tr>
        </thead>
        <tbody>
        {leaderboard.map((player, index) => (
            <tr key={player._id}>
            <td>{index + 1}</td>
            <td>{player.name}</td>
            <td>{player.score}</td>
            </tr>
        ))}
        {/* Fill empty slots if less than 10 entries */}
        {[...Array(Math.max(0, 10 - leaderboard.length))].map((_, index) => (
            <tr key={`empty-${index}`}>
            <td>{leaderboard.length + index + 1}</td>
            <td>---</td>
            <td>---</td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
);
};

export default Board;