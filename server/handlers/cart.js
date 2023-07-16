const Cart = require("../models/cart");
const Item = require("../models/item");

cartFetchOne = async function (userId, itemId) {
  try {
    let item = await Cart.findOne({
      user: userId,
      item: itemId,
    }).select("user item quantity createdAt");
    itemPrice = await Item.findOne({ _id: itemId }).select("price");
    item = item.toObject();
    item.price = itemPrice.price;
    return item;
  } catch (err) {
    return next(err);
  }
};

exports.cartFetchAll = async function (req, res, next) {
  try {
    const allItemsId = await Cart.find({
      user: req.userId,
    }).select("item");

    const cartItems = await Promise.all(
      allItemsId.map(async (id) => {
        const item = await cartFetchOne(req.userId, id.item);
        return item;
      })
    );
    console.log(cartItems);
    res.status(200).json(cartItems);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.cartIncrement = async function (req, res, next) {
  try {
    const { itemId, quantity } = req.body;
    const userId = req.userId;
    const item = await Cart.updateOne(
      { user: userId, item: itemId },
      { $inc: { quantity: quantity } },
      { upsert: true }
    );
    const addedItem = await cartFetchOne(userId, itemId);
    res.status(200).json(addedItem);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.cartDecrement = async function (req, res, next) {
  try {
    const { itemId, quantity } = req.params;
    const userId = req.userId;
    const item = await Cart.updateOne(
      { user: userId, item: itemId },
      { $inc: { quantity: -quantity } }
    );
    let reducedItem = await cartFetchOne(userId, itemId);
    console.log(reducedItem);
    if (reducedItem.quantity <= 0)
      await Cart.deleteOne({ user: userId, item: itemId });
    console.log(reducedItem);
    res.status(200).json(reducedItem);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};
