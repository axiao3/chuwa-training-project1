const Cart = require("../models/cart");

exports.addItem = async function (req, res, next) {
  try {
    console.log("addItem", req.body);
    const userId = req.body.user;
    const itemId = req.body.item;
    const item = await Cart.findOne({ user: userId, item: itemId });
    if (!item) {
      const newItem = new Cart(req.body);
      const savedItem = await newItem.save();
      res.status(200).json(savedItem);
    } else {
      const updatedItem = await Cart.findOneAndUpdate(
        { user: userId, item: itemId },
        { quantity: req.body.quantity },
        { new: true }
      );
      res.status(200).json(updatedItem);
    }
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.removeItem = async function (req, res, next) {
  try {
    const id = req.params.itemId;
    const items = await Cart.remove({ _id: id });
    res.status(200).json(items);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.getAllItems = async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const items = await Cart.find({ user: userId });
    res.status(200).json(items);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.getOneItem = async function (req, res, next) {
  try {
    const { userId, itemId } = req.params;
    const item = await Cart.findOne({ user: userId, item: itemId });

    res.status(200).json(item);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};
