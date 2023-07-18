const jwt = require("jsonwebtoken");

exports.ensureCorrectUser = async function (req, res, next) {
  try {
    const token = req.headers.authorization;
    // console.log("token: ", token);
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("decoded: ", decoded);
    // console.log("req.body: ", req.body);
    if (decoded && decoded.id === req.body.user_id) {   
      console.log("Authorized!");
      return next();
    } else {
      return next({
        status: 401,
        message: "Unauthorized",
      });
    }
  } catch (err) {
    return next({
      status: 401,
      message: "Unauthorized",
    });
  }
};
