const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const fortuneRoutes = require('./routes/fortuneRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 3000;

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(session({
  secret: 'fortune-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

app.use('/today-luck', fortuneRoutes);
app.use('/', authRoutes); 

app.listen(PORT, () => {
  console.log(`🚀 Haruby 추천봇 서버 실행 중: http://localhost:${PORT}`);
});
