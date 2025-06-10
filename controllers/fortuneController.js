const data = require('../data/fortunes');

function getRandomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

exports.getFullFortune = (req, res) => {
  const result = {
    운세: getRandomItem(data.fortunes),
    음식: getRandomItem(data.foods),
    음악: getRandomItem(data.musics),
    게임: getRandomItem(data.games)
  };
  res.json(result);
};

exports.getByCategory = (req, res) => {
  const { category } = req.params;
  if (data[category]) {
    res.json({ [category]: getRandomItem(data[category]) });
  } else {
    res.status(404).json({ error: '존재하지 않는 카테고리입니다.' });
  }
};
