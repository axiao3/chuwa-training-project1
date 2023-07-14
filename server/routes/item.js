const express = require('express');
const router = express.Router();
const { getList } = require('../handlers/item');

router.get('/get-list', getList);


module.exports = router;