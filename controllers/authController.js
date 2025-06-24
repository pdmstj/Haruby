const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const usersFile = path.join(__dirname, '../data/users.json');

exports.signup = (req, res) => {
  const { nickname, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));

  if (users.find(u => u.nickname === nickname)) {
    return res.status(400).json({ success: false, message: '이미 존재하는 닉네임입니다.' });
  }

  const hashed = bcrypt.hashSync(password, 10);
  users.push({ nickname, password: hashed });
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.json({ success: true, message: '회원가입 완료!' });
};

exports.login = (req, res) => {
  const { nickname, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
  const user = users.find(u => u.nickname === nickname);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ success: false, message: '로그인 실패: 정보가 올바르지 않아요.' });
  }

  req.session.user = nickname;
  res.json({ success: true, message: '로그인 성공!', nickname });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true, message: '로그아웃 되었습니다.' });
  });
};

exports.checkLogin = (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, nickname: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
};
