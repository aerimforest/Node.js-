const express = require('express');
const User = require('../schemas/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try { // 조회 성공
    const users = await User.find({}); // 모든 사용자를 찾음
    res.render('mongoose', { users }); // 위에서 찾은 것을 mongoose.html을 렌더링할 때 users 변수로 넣음
  } catch (err) { // 조회 실패
    console.error(err);
    next(err);
  }
});

module.exports = router;