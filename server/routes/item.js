const express = require("express");
const router = express.Router();
const { getList } = require("../handlers/item");
const { checkAuthentication } = require("../middleware/checkAuthentication");
const { checkUserExists } = require("../middleware/checkUserExists");
// router.use(checkAuthentication);
router.get("/get-list", checkAuthentication, checkUserExists, getList);
// router.post ("/get-one/:id", checkAuthentication, checkUserExists, getOne) add a item into
// router.delete()
module.exports = router;
