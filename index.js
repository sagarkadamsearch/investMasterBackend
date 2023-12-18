const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser');
const { connection } = require("./db")
const { userRoute } = require("./routes/user.route")
const app = express()
app.use(cookieParser());
app.use(express.json())
app.use(cors())

app.use("/users", userRoute)

app.listen(3030, async()=>{
    try{
        await connection;
        console.log("Connected To database")
        console.log("Server is Running on port 3030")
    }catch(err){
        console.log(err)
    }
})

module.exports=app