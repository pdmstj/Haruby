const express = require('express');
const router = express.Router();
const controller = require('../controllers/fortuneController');

// 메모리에 추천 기록 저장 (user: date)
const recommendationLog = {}; 

router.get('/birthday/fortune', controller.getBirthdayFortune);

// 전체 운세 추천 (하루 1회 제한)
router.get('/', (req, res) => {
  const user = req.session.user;

  if (!user) {
    return res.status(401).json({ error: '로그인이 필요합니다.' });
  }

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  if (recommendationLog[user] === today) {
    return res.status(429).json({ error: '오늘은 이미 추천을 받으셨어요! 내일 다시 와주세요 :)' });
  }

  recommendationLog[user] = today;

  // controller에게 요청 위임 (res를 넘김)
  controller.getFullFortune(req, res);
});


// 카테고리별 추천은 로그인 없이도 가능
router.get('/:category', controller.getByCategory);

module.exports = router;
