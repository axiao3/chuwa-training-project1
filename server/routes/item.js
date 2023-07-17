const express = require("express");
const router = express.Router({ mergeParams: true });
const { getList, getOne, getAmount, createItem, editItem } = require("../handlers/item");
const { checkAuthentication } = require("../middleware/checkAuthentication");
const { checkUserExists } = require("../middleware/checkUserExists");
// router.use(checkAuthentication);
router.get(
  "/get-list/:sort/:page",
  checkAuthentication,
  checkUserExists,
  getList
);
router.get("/get-one/:id", checkAuthentication, checkUserExists, getOne);
router.get("/get-amount", checkAuthentication, checkUserExists, getAmount);
router.post('/', createItem);
router.put('/', editItem);

module.exports = router;