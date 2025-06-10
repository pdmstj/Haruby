const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fortuneRoutes = require('./routes/fortuneRoutes');

const app = express();
const PORT = 3000;

app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.use(express.static('public'));

app.use('/today-luck', fortuneRoutes);

app.listen(PORT, () => {
  console.log(`운세 추천봇이 실행 중입니다: http://localhost:${PORT}`);
});
