const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

router.route('/')
    // GET /users 주소로 요청이 들어올 때의 라우터
    // 사용자를 조회하는 요청을 처리(데이터를 JSON 형식으로 반환)
    .get(async (req, res, next) => { 
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })

    // POST /users 주소로 요청이 들어올 때의 라우터
    // 사용자를 등록하는 요청을 처리
    .post(async (req, res, next) => { // POST /users 주소로 요청이 들어올 때의 라우터
        try {
            const user = await User.create({
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


router.get('/:id/comments', async (req, res, next) => {
    try {
        const comments = await Comment.findAll({
            include: {
                model: User,
                where: { id: req.params.id }, // GET /users/1/comments라면 사용자 id가 1인 댓글을 불러옴
            },
        });
        console.log(comments);
        res.json(comments);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;