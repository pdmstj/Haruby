const express = require('express');
const router = express.Router();
const controller = require('../controllers/fortuneController');

router.get('/', controller.getFullFortune);

router.get('/:category', controller.getByCategory);

module.exports = router;
