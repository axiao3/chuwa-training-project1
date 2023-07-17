const express = require("express");
const router = express.Router({ mergeParams: true });
const { getList, getOne, createItem, editItem } = require("../handlers/item");
const { checkAuthentication } = require("../middleware/checkAuthentication");
const { checkUserExists } = require("../middleware/checkUserExists");

router.get("/get-list", checkAuthentication, checkUserExists, getList);
router.get("/get-one/:id", checkAuthentication, checkUserExists, getOne);
router.post('/', createItem);
router.put('/', editItem);

module.exports = router;