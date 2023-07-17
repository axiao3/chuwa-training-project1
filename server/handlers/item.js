const User = require("../models/user");
const Item = require("../models/item");
const db = require("../models");

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

exports.createItem = async function (req, res, next) {
  try {
    const item = await Item.create({
      owner: req.params.user_id,
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      link: req.body.link,
    });
    return res.status(200).json(item);
  } catch (err) {
    return next(err);
  }
};

exports.editItem = async (req, res, next) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.body.product_id, req.body, {new: true});
    return res.status(200).json(updatedItem);
  } catch (err) {
    return next(err);
  }
};
