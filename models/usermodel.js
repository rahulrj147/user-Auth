const mongoose = require("mongoose");

const userschema = mongoose.Schema({
    email:{
        type : String,
        required : true
    },
    password:{
        type:String,
        required : true
    },
    role:{
        type: String, 
        enum: ["admin", "student", "visitor"], 
        required: true
    },
    token:{
        type: String,
        required : false
    }
})

module.exports = mongoose.model("user", userschema);