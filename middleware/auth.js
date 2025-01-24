const user = require("../models/usermodel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    // const { token } = req.body ;
    const token = req.cookies.cookie;

    // const token = req.headers.authorization.replace("Bearer ","");
    // console.log(token);

    if (!token) {
      return res.status(500).json({
        success: false,
        message: "token missing",
      });
    }

    try {
      const decodedpayload = await jwt.verify(token, process.env.SECRET);
      req.payload = decodedpayload;
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "error in finding decodedpayload",
      });
    }
    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "error auth",
    });
  }
};

exports.isStudent = async (req, res, next) => {
  const role = req.payload.role;
  if (role != "student") {
    return res.status(500).json({
      success: false,
      message: "you are not student and not allowed",
    });
  }
  next();
};
exports.isAdmin = async (req, res, next) => {
  const role = req.payload.role;
  if (role != "admin") {
    return res.status(500).json({
      success: false,
      message: "you are not admin and not allowed",
    });
  }
  next();
};
