const mongoose = require("mongoose");
require("dotenv").config();
const dbconnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{ console.log("DB connected") })
    .catch((e)=>{ console.log("problem in DB connection") });
    
}
module.exports =  dbconnect;