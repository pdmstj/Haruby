const express = require('express');
const router = express.Router();
const controller = require('../controllers/fortuneController');

// ✅ 생일 기반 운세 라우터 (순서 중요!)
router.get('/birthday/fortune', controller.getBirthdayFortune);

// 전체 운세
router.get('/', controller.getFullFortune);

// 카테고리별 (음식, 음악, 게임 등)
router.get('/:category', controller.getByCategory);

module.exports = router;
