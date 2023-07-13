const db = require("../models");
const jwt = require("jsonwebtoken");

const findUserByEmail = async function (email) {
  const user = await db.User.findOne({
    email: email,
  });
  return user;
};

exports.signup = async function (req, res, next) {
  try {
    let user = await db.User.create(req.body);
    let { id, email, type } = user;
    let token = await jwt.sign({ id, email, type }, process.env.JWT_SECRET_KEY);
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

exports.ifEmailExist = async function (req, res, next) {
  try {
    const user = await findUserByEmail(req.query.email);
    return res.status(200).json({
      isEmailExist: !!user,
    });
  } catch (err) {
    next(err);
  }
};

exports.changePassword = async function (req, res, next) {
  try {
    const user = await findUserByEmail(req.body.email);
    const { id, email, type } = user;

    const isMatch = await user.comparePassword(req.body.password);

    if (!isMatch) {
      user.password = req.body.password;
      await user.save();
      let token = await jwt.sign(
        { id, email, type },
        process.env.JWT_SECRET_KEY
      );
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
  } catch (err) {
    return next({
      status: 400,
      message: "Invalid Email / Password.",
    });
  }
};
