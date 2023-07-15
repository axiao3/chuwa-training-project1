const User = require("../models/user");

exports.checkUserExists = async function (req, res, next) {
  try {
    const user = await User.findOne({ email: req.email });
    if (!user)
      return next({
        status: 404,
        message: "cannot find user",
      });
    req.userId = user._id;
    next();
  } catch (err) {
    return res.status(500).json(err);
  }
};
