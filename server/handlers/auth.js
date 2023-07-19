const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const findUserByEmail = async function (email) {
  const user = await db.User.findOne({
    email: email,
  });
  return user;
};

exports.signup = async function (req, res, next) {
  try {
    let user = await db.User.create(req.body);
    let { email, type, id } = user;
    let token = jwt.sign({ id, email, type }, process.env.JWT_SECRET_KEY);
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
      email: req.body.email,
    });
    if (!user) {
      return next({
        status: 400,
        message: "Invalid Email / Password.",
      });
    } 
    let { email, password, type, id } = user;
    let isMatch = await bcrypt.compare(req.body.password, password);
    if (isMatch) {
      // Generate JWT Token
      let token = jwt.sign({ id, email, type }, process.env.JWT_SECRET_KEY);
      return res.status(200).json({
        email,
        isMatch,
        token,
        type,
        id,
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email / Password.",
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.ifEmailExist = async function (req, res, next) {
  try {
    const user = await findUserByEmail(req.body.email);
    if (user) {
      return res.status(200).json({
        isEmailExist: true
      });
    } else {
      return next({
        status: 400,
        message: "Email is not registered",
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.changePassword = async function (req, res, next) {
  try {
    const user = await findUserByEmail(req.body.email);
    const { id, email, type } = user;

    const oldPasswordIsMatch = await user.comparePassword(req.body.previous);

    if (oldPasswordIsMatch) {
      const newPasswordIsMatch = await user.comparePassword(req.body.current);

      if (!newPasswordIsMatch) {
        user.password = req.body.current;
        await user.save();
        let token = jwt.sign({ id, email, type }, process.env.JWT_SECRET_KEY);
        return res.status(200).json({
          id,
          email,
          token,
        });
      } else {
        return next({
          status: 400,
          message: "New password must be different from the current one",
        });
      }
    } else {
      return next({
        status: 400,
        message: "Previous Password incorrect",
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};
