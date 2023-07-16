const jwt = require("jsonwebtoken");

exports.checkAuthentication = function (req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token)
      return res
        .status(403)
        .json({ auth: false, message: "No token provided." });
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.email = decoded.email;
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ auth: false, message: "Failed to authenticate token." });
  }
};
