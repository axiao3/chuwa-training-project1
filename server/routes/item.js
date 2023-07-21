const express = require("express");
const router = express.Router({ mergeParams: true });
const { getList, getOne, getAmount, createItem, editItem, deleteItem } = require("../handlers/item");
const { checkAuthentication } = require("../middleware/checkAuthentication");
const { checkUserExists } = require("../middleware/checkUserExists");
const { ensureCorrectUser } = require("../middleware/checkCorrectUser");
// router.use(checkAuthentication);
router.get("/get-list/:sort/:page", checkAuthentication, checkUserExists, getList);
router.get("/get-one/:id", checkAuthentication, checkUserExists, getOne);
router.get("/get-amount", checkAuthentication, checkUserExists, getAmount);
router.post('/', ensureCorrectUser, createItem);
router.put('/', ensureCorrectUser, editItem);
router.delete('/:id', ensureCorrectUser, deleteItem);

module.exports = router;