const express = require("express");
const router = express.Router();
const {
  addItem,
  removeItem,
  getAllItems,
  getOneItem,
} = require("../handlers/cart");

router.get("/get_all/:userId", getAllItems);
router.get("/get_one/:userId/:itemId", getOneItem);
router.post("/add", addItem); //cart/add
router.delete("/:itemId", removeItem); //cart/:itemId

module.exports = router;
