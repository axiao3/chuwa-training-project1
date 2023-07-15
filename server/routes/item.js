const express = require("express");
const router = express.Router();
const { getList } = require("../handlers/item");
const { checkAuthentication } = require("../middleware/checkAuthentication");
const { checkUserExists } = require("../middleware/checkUserExists");
// router.use(checkAuthentication);
router.get("/get-list", checkAuthentication, checkUserExists, getList);

module.exports = router;
