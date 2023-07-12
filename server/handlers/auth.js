const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signup = async function (req, res, next) {
  try {
    let user = await db.User.create(req.body);
    let { email, type } = user;
    let token = await jwt.sign({ email }, process.env.JWT_SECRET_KEY);
    return res.status(200).json({
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
