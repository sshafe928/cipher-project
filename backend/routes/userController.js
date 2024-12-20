const express = require("express");
const router = express.Router();
const { readAllUsers, getLeaderboardByLevel, createUser  } = require('../controllers/user');


router.get('/leaderboard-info', readAllUsers);
router.get('/leaderboard/:level', getLeaderboardByLevel);
router.post("/", createUser);


    


module.exports = router;