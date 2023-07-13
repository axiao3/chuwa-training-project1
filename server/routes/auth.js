const express = require('express');
const router = express.Router();
const { signup, ifEmailExist, changePassword } = require('../handlers/auth');

router.post('/signup', signup);
// router.post('/signin', signin);
router.get('/users/exists', ifEmailExist);
router.put('/users/password', changePassword);

module.exports = router;