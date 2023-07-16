const express = require("express");
const router = express.Router();
const { getList, getOne, getAmount } = require("../handlers/item");
const { checkAuthentication } = require("../middleware/checkAuthentication");
const { checkUserExists } = require("../middleware/checkUserExists");

router.get(
  "/get-list/:sort/:page",
  checkAuthentication,
  checkUserExists,
  getList
);
router.get("/get-one/:id", checkAuthentication, checkUserExists, getOne);
router.get("/get-amount", checkAuthentication, checkUserExists, getAmount);

module.exports = router;
