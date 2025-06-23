const data = require('../data/fortunes');

// 리스트에서 랜덤 하나 뽑기
function getRandomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// 전체 추천
exports.getFullFortune = (req, res) => {
  const result = {
    운세: getRandomItem(data.fortunes),
    음식: getRandomItem(data.foods),
    음악: getRandomItem(data.musics),
    게임: getRandomItem(data.games)
  };
  res.json(result);
};

// 카테고리별 추천
exports.getByCategory = (req, res) => {
  const { category } = req.params;
  if (data[category]) {
    res.json({ [category]: getRandomItem(data[category]) });
  } else {
    res.status(404).json({ error: '존재하지 않는 카테고리입니다.' });
  }
};

// 생일 기반 운세
exports.getBirthdayFortune = (req, res) => {
  const { birth } = req.query;

  // YYYY-MM-DD 형식 체크
  if (!birth || !/^\d{4}-\d{2}-\d{2}$/.test(birth)) {
    return res.status(400).json({ error: "생년월일은 YYYY-MM-DD 형식이어야 해요." });
  }

  const month = parseInt(birth.split("-")[1], 10); // MM 추출
  const list = data.birthdayFortunes[month];

  if (Array.isArray(list)) {
    const fortune = getRandomItem(list); // ✅ 랜덤으로 1개
    res.json({ birth, month, fortune });
  } else {
    res.status(404).json({ error: "운세를 찾을 수 없어요." });
  }
};
