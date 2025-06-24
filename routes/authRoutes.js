const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.post('/register', auth.signup);
router.post('/login', auth.login);
router.post('/logout', auth.logout);
router.get('/check', auth.checkLogin);

module.exports = router;
