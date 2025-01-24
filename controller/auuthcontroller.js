const user = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.signupcontroller = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(500).json({
        success: false,
        messge: "enter all the informations",
      });
    }
    const fuser = await user.findOne({ email });
    if (fuser) {
      return res.status(500).json({
        success: false,
        messge: "email is already reisiterd",
      });
    }

    let dpass;
    try {
      dpass = await bcrypt.hash(password, 10);
    } catch (e) {
      return res.status(500).json({
        success: false,
        messge: "error in hashing onn password",
      });
    }

    const obj = new user({
      email,
      password: dpass,
      role,
    });

    await obj.save();
    return res.status(200).json({
      success: true,
      data: obj,
      messge: "successfully signup",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      messge: "error in signup",
    });
  }
};

exports.logincontroller = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(500).json({
        success: false,
        messge: "enter all the informations",
      });
    }
    let fuser = await user.findOne({ email });
    if (!fuser) {
      return res.status(500).json({
        success: false,
        messge: "first signup ",
      });
    }

    bcrypt.compare(password, fuser.password, (err, ans) => {
      if (err) {
        return res.status(500).json({
          success: false,
          messge: "error is password matching ",
        });
      }

      if (ans) {
        //password match
        const keyoftoken = process.env.SECRET;

        const payload = {
          email,
          role,
          id: fuser._id,
        };

        const token = jwt.sign(payload, keyoftoken, { expiresIn: "2h" });
        
        //either i can use this to convert it into object or when finding the object in db findOne({email}).lean() 
        //this lean funciton will convert this into plain object

        // dont wanna do anyhting then - whetever new we insert here must be define in model
        // fuser = fuser.toObject();
        fuser.token = token;
        fuser.password = undefined;


        res.cookie("cookie", token, {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          })
          .status(200)
          .json({
            success: true,
            token,
            fuser,
            messge: "user login successsfullyyy",
          });
      } else {
        return res.status(500).json({
          success: false,
          messge: "wrong password",
        });
      }
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      messge: "error in login  ",
    });
  }
};
