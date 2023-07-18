const jwt = require("jsonwebtoken");

exports.ensureCorrectUser = async function (req, res, next) {
    try {
      const token = req.headers.authorization
      const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (decoded && decoded.id === req.body.user_id) {
        return next();
      } else {
        return next({
          status: 401,
          message: 'Unauthorized'
        });
      }
    } catch (err) {
      return next({
        status: 401,
        message: 'Unauthorized'
      });
    }
  };