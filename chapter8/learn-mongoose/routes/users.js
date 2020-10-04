const express = require('express');
const User = require('../schemas/user');
const Comment = require('../schemas/comment');

const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const user = await User.create({ // 사용자 등록 메서드
                name: req.body.name,
                age: req.body.age,
                married: req.body.married,
            });
            console.log(user);
            res.status(201).json(user);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

// 댓글 다큐먼트 조회하는 라우터
router.get('/:id/comments', async (req, res, next) => {
    try {
        const comments = await Comment.find({ commenter: req.params.id }) // 댓글을 작성한 사용자의 아이디로 댓글 조회
        .populate('commenter'); // 관련 있는 컬렉션의 다큐먼트 불러옴
        console.log(comments);
        res.json(comments);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;