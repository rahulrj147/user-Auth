const express = require("express");
const router = express.Router();
const user = require("../models/usermodel");


const{signupcontroller,logincontroller } = require("../controller/auuthcontroller");

router.post("/signup" , signupcontroller);
router.post("/login",logincontroller);

// autherization based on role
const{auth , isStudent , isAdmin} = require("../middleware/auth");

router.post("/student" , auth , isStudent , (req,res)=>{
    res.status(200).json({
        success: true,
        message: "you are on student portal"
    })
})

router.post("/admin" , auth , isAdmin , (req,res)=>{
    res.status(200).json({
        success: true,
        message: "you are on admin portal"
    })
} )

router.get("/getdetail" , auth , async (req,res)=>{
    const id = req.payload.id;
    const userf = await user.findById(id);
    res.status(200).json({
        success:true,
        user: userf,
        message:"details got successfully"
    })
})

module.exports = router;