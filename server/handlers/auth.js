const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async function (req, res, next) {
  try {
    let user = await db.User.create(req.body);
    let { email, type, id } = user;
    let token = await jwt.sign({ email }, process.env.JWT_SECRET_KEY);
    return res.status(200).json({
      id,
      email,
      type,
      token,
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "This email is taken";
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.signin = async function (req, res, next) {
  try {
    let user = await db.User.findOne({
      email: req.body.email
    });
    let { email, password} = user;
    let isMatch = await bcrypt.compare(req.body.password, password);
    console.log("Sign in Backend handler/auth: " + isMatch);
    
    if(isMatch){
      // Generate JWT Token
      let token = jwt.sign({email}, process.env.JWT_SECRET_KEY);
      return res.status(200).json({
        email,
        isMatch,
        token
      });
    }else{
      return next({
        status: 400,
        message: 'Invalid Email / Password.'
      });
    }
    
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};
