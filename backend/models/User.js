const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        maxLength:[3, "The name cannot exceed 20 characters"]
    },
    id:{
        type:Date
    },
    time:{
        type:Number
    },
    score:{
        type:Number
    },
    level:{
        type:String
    }
}, {collection: "users"})

module.exports = mongoose.model("User", userSchema);