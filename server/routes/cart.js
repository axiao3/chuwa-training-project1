const express = require("express");
const router = express.Router();
const {
  cartIncrement,
  cartDecrement,
  cartFetchAll,
} = require("../handlers/cart");

const { checkAuthentication } = require("../middleware/checkAuthentication");
const { checkUserExists } = require("../middleware/checkUserExists");

router.get("/get-all", checkAuthentication, checkUserExists, cartFetchAll);
router.post("/add", checkAuthentication, checkUserExists, cartIncrement); //cart/add
router.delete(
  "/:itemId/:quantity",
  checkAuthentication,
  checkUserExists,
  cartDecrement
);

module.exports = router;
