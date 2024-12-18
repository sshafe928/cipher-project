const express = require("express");
const router = express.Router();
const {readAllUsers, createUser} = require("../controllers/user");

router.get("/Leaderboard", readAllUsers);
router.post("/CipherGame", createUser);



module.exports = router;