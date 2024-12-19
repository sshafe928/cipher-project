const User = require("../models/User");

const readAllUsers = async (req, res) => {
    try {
        let item = await User.find({});
        res.json({success: true, data: item});
    } catch(err) {
        console.log(err)
    }
}

const createUser = async (req, res) => {
    const { initials, score, timeSpent, id, level } = req.body;  

    try {
        const newUser = new User({ initials, score, timeSpent, id, level });
        await newUser.save();
        res.status(201).json({ message: 'User data saved successfully' });
    } catch (err) {
        console.error("Error saving user data:", err); 
        res.status(500).json({ error: 'Failed to save user data' });
    }
};








module.exports = {readAllUsers, createUser};