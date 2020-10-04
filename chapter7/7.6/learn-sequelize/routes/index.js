const express = require('express');
const User = require('../models/user');

const router = express.Router();

// GET / 로 접속했을 때의 라우터
router.get('/', async (req, res, next) => {
  try { // 성공
    const users = await User.findAll(); // 모든 사용자를 찾음
    res.render('sequelize', { users }); // sequelize.html을 렌더링할 때 결과값인 users를 넣음
  } catch (err) { // 실패
    console.error(err);
    next(err);
  }
});

module.exports = router;