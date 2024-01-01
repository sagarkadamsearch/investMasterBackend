const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    fname:String,
    lname:String,
    coinNama:String,
    password:String
},{
    versionKey:false
})

const userModel = mongoose.model("user", userSchema)

module.exports={userModel}