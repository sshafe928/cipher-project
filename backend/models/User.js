const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 5
    },
    score: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    level: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);