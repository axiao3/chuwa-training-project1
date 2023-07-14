const db = require("../models");

exports.getList = async function (req, res, next) {
  try {
    const items = await db.Item.find({});
    res.status(200).json(items);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};
