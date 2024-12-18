const express = require("express");
const router = express.Router();
const {readAllUsers, createUser} = require("../controllers/user");

router.get("/leaderboard-info", readAllUsers);
router.post("/", createUser);



module.exports = router;