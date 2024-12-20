const User = require("../models/User");

const readAllUsers = async (req, res) => {
    try {
    // Get all users sorted by score in descending order
    const users = await User.find({})
    .select('name score time level') // Only select needed fields
    .sort({ score: -1 });
    
    res.json(users);
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

const getLeaderboardByLevel = async (req, res) => {
try {
    const { level } = req.params;
    
    // Get top 10 users for specific level
    const topUsers = await User.find({ level })
    .select('name score time')
    .sort({ score: -1 })
    .limit(10);
    
    res.json(topUsers);
} catch (error) {
    res.status(500).json({ message: error.message });
}
};


const createUser = async (req, res) => {
    try {
    console.log('Received data:', req.body);
    
    // Validate the data before creating the user
    if (!req.body.name || typeof req.body.name !== 'string') {
        throw new Error('Invalid name provided');
    }

    const userData = {
        name: req.body.name.trim(), // Remove any whitespace
        score: Number(req.body.score),
        time: Number(req.body.time),
        id: Number(req.body.id),
        level: req.body.level
    };

    console.log('Processed user data:', userData);

    const user = new User(userData);
    const savedUser = await user.save();
    
    console.log('Successfully saved user:', savedUser);
    res.status(201).json(savedUser);
    } catch (error) {
    console.error('Detailed error:', {
        message: error.message,
        name: error.name,
        errors: error.errors,
        stack: error.stack
    });
    res.status(500).json({ 
        message: error.message,
        details: error.errors
    });
    }
};








module.exports = {readAllUsers,getLeaderboardByLevel, createUser};