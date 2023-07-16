const User = require("../models/user");
const Item = require("../models/item");

exports.getAmount = async function (req, res, next) {
  try {
    const rowCount = await Item.countDocuments();
    res.status(200).json(rowCount);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.getList = async function (req, res, next) {
  try {
    const sort = parseInt(req.params.sort);
    const page = parseInt(req.params.page);
    console.log("---------------------------------------------", page, sort);
    let items = [];
    if (sort === 0)
      items = await Item.find({})
        .sort({ createdAt: -1 })
        .skip(page * 10)
        .limit(10);
    else if (sort === 1)
      items = await Item.find({})
        .sort({ price: 1 })
        .skip(page * 10)
        .limit(10);
    else if (sort === -1)
      items = await Item.find({})
        .sort({ price: -1 })
        .skip(page * 10)
        .limit(10);

    res.status(200).json(items);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.getOne = async function (req, res, next) {
  try {
    const cartItems = await Item.findById(req.params?.id);
    res.status(200).json(cartItems);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};
