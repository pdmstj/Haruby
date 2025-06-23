const data = require('../data/fortunes');

// 리스트에서 랜덤 하나 뽑기
function getRandomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// ✅ 전체 추천 (운세, 음식, 음악, 게임)
exports.getFullFortune = (req, res) => {
  const result = {
    운세: getRandomItem(data.fortunes),
    음식: getRandomItem(data.foods),
    음악: getRandomItem(data.musics),
    게임: getRandomItem(data.games)
  };
  res.json(result);
};

// ✅ 카테고리별 추천 (/today-luck/foods 등)
exports.getByCategory = (req, res) => {
  const { category } = req.params;
  if (data[category]) {
    res.json({ [category]: getRandomItem(data[category]) });
  } else {
    res.status(404).json({ error: '존재하지 않는 카테고리입니다.' });
  }
};

// ✅ 생일 기반 운세 추천 (/today-luck/birthday/fortune?birth=YYYY-MM-DD)
exports.getBirthdayFortune = (req, res) => {
  const { birth } = req.query;

  // 날짜 형식 체크
  if (!birth || !/^\d{4}-\d{2}-\d{2}$/.test(birth)) {
    return res.status(400).json({ error: "생년월일은 YYYY-MM-DD 형식이어야 해요." });
  }

  const [year, month, day] = birth.split("-").map(Number);
  const list = data.birthdayFortunes[month];

  // 별자리 계산
  const zodiac = getZodiacSign(month, day);

  if (Array.isArray(list)) {
    const fortune = getRandomItem(list);
    res.json({ birth, month, fortune, zodiac }); // ⭐ 별자리 포함
  } else {
    res.status(404).json({ error: "운세를 찾을 수 없어요." });
  }
};

// 🔮 별자리 계산 함수
function getZodiacSign(month, day) {
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "물병자리";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "물고기자리";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "양자리";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "황소자리";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return "쌍둥이자리";
  if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return "게자리";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "사자자리";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "처녀자리";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) return "천칭자리";
  if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) return "전갈자리";
  if ((month === 11 && day >= 23) || (month === 12 && day <= 24)) return "사수자리";
  return "염소자리";
}