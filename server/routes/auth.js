const express = require('express');
const router = express.Router();
const { signup, signin, ifEmailExist, changePassword } = require('../handlers/auth');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/exists', ifEmailExist);
router.put('/password', changePassword);

module.exports = router;