const User = require("../models/User");

const readAllUsers = async (req, res) => {
    try {
        let item = await User.find({});
        res.json({success: true, data: item});
    } catch(err) {
        console.log(err)
    }
}

const createUser = async(req, res) => {
    try {
        const {name, id} = req.body;
        let item = await User.findOne({id: id});
        if(!name || !id){
            console.log("not all fields are filled out");
            return res.json({data: [], success: false, msg: "Please fill out all fields"})
        } else if(item != null) {
            console.log("a user with that id already exists");
            return res.json({data: [], success: false, msg: "that id's already taken, try another"})
        } else {
            let itemTwo = await User.create(req.body);
            res.json({success: true, data: itemTwo});
        }
    } catch(err) {
        console.log(err);
    }
}








module.exports = {readAllUsers, createUser};