const Cart = require("../models/cart");
const Item = require("../models/item");

cartFetchOne = async function (userId, itemId) {
  try {
    let item = await Cart.findOne({
      user: userId,
      item: itemId,
    }).select("user item quantity createdAt");    // return a Mongoose document
    itemPrice = await Item.findOne({ _id: itemId }).select("price");
    item = item.toObject();     // convert this Mongoose document to a regular object                 
    item.price = itemPrice.price;
    return item;  // {user: , item: , quantity: , createdAt: , price: }
  } catch (err) {
    return next(err);
  }
};

exports.cartFetchAll = async function (req, res, next) {
  try {
    const allItemsId = await Cart.find({
      user: req.userId,
    }).select("item");  
    // [
    //   { "item": "ObjectId1" },
    //   { "item": "ObjectId2" },
    //   ...
    // ]

    const cartItems = await Promise.all(
      allItemsId.map(async (id) => {
        const item = await cartFetchOne(req.userId, id.item);
        return item;  
      })
    );
    res.status(200).json(cartItems);
      // [{user: , item: , quantity: , createdAt: , price: },
      //  {user: , item: , quantity: , createdAt: , price: },
      //  {user: , item: , quantity: , createdAt: , price: }]
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
      { user: userId, item: itemId },   // Filter condition
      { $inc: { quantity: quantity } }, // Update operation
      { upsert: true }                  // Options
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
    if (reducedItem.quantity <= 0)
      await Cart.deleteOne({ user: userId, item: itemId });
    res.status(200).json(reducedItem);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};
