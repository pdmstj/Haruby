const express = require('express');
const router = express.Router();
const controller = require('../controllers/fortuneController');

router.get('/birthday/fortune', controller.getBirthdayFortune);
router.get('/', controller.getFullFortune);
router.get('/:category', controller.getByCategory);

module.exports = router;
