const User = require("../models/user");
const Item = require("../models/item");

exports.getList = async function (req, res, next) {
  try {
    const cartItems = await Item.find({});
    console.log(cartItems);
    res.status(200).json(cartItems);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.getOne = async function (req, res, next) {
  // console.log("req id: ");
  // console.log(req.params.id);
  try {
    const cartItems = await Item.findById(req.params?.id);
    console.log(cartItems);
    res.status(200).json(cartItems);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};
