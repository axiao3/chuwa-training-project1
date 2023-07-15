const db = require("../models");

exports.createItem = async function (req, res, next) {
  try {
    const item = await db.Item.create({
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
    const updatedItem = await db.Item.findByIdAndUpdate(req.body.product_id, req.body, {new: true});
    return res.status(200).json(updatedItem);
  } catch (err) {
    return next(err);
  }
};
