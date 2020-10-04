const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
  // 로그인시 실행됨
  // req.session 객체에 어떤 데이터를 저장할지 겨렁
  passport.serializeUser((user, done) => {
    done(null, user.id); // done(에러 발생 시 사용, 저장하고 싶은 데이터)
  });

  // 매 요청시 실행됨
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local(); 
  kakao();
};
