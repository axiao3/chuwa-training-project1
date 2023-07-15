const express = require('express');
const router = express.Router({ mergeParams: true });
const { createItem, editItem } = require('../handlers/item');

router.post('/', createItem);
router.put('/', editItem);

module.exports = router;