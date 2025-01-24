const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log("server starded here");
})

const dbconnect = require("./config/database");
dbconnect();

app.use(express.json());

const cookie = require("cookie-parser");
app.use(cookie());

const auth = require("./routers/router");
app.use("/v1", auth );