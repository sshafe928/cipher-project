const { MongoClient } = require("mongodb");
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
require("dotenv").config();
const userRoute = require("./routes/userController");
const connectDB = require("./db/connect");
const port = 5000

// Middleware
app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())


//Body Parser
app.use(express.urlencoded({extended : false}));

// CheckPath
app.get('/',(req,res)=>{
    res.send('Server is Working')
    //Use this to check to make sure the server is working by going to http://localhost/5000
    //If you see App is working that means the backend server is working
})

//Routes
app.use("/users", userRoute);

const initServer = async() => {
    try {
        await connectDB("mongodb+srv://admin_man:trN9Eb44Y4vSo5E6@task-manager-practice.ru0bz.mongodb.net/cipher-users?retryWrites=true&w=majority");
        app.listen(port, () => {
            console.log("Listening on port 5000");
        })
    } catch(err) {
        console.log(err);
    }
}
initServer();

