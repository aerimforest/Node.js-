const express = require('express');
const Comment = require('../schemas/comment');

const router = express.Router();

// 다큐먼트 등록 라우터
router.post('/', async (req, res, next) => {
  try {
    const comment = await Comment.create({ // 댓글 저장
      commenter: req.body.id,
      comment: req.body.comment,
    });
    console.log(comment);
    // 프로미스의 결과로 반환된 comment 객체에 다른 컬렉션 다큐먼트 불러옴
    // path 옵션 : 어떤 필드를 합칠지
    const result = await Comment.populate(comment, { path: 'commenter' });
    
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.route('/:id') // 다큐먼트 수정 라우터
  .patch(async (req, res, next) => {
    try {
      const result = await Comment.update({
        _id: req.params.id, // 어떤 다큐먼트를 수정할지
      }, {
        comment: req.body.comment, 
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => { // 다큐먼트 삭제 라우터
    try {
      const result = await Comment.remove({ _id: req.params.id });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
