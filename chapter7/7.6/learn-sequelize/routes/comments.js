const express = require('express');
const { User, Comment } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const comment = await Comment.create({
            commenter: req.body.id,
            comment: req.body.comment,
        });
        console.log(comment);
        res.status(201).json(comment);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.route('/:id')
    // 댓글 수정 라우터
    .patch(async (req, res, next) => {
        try {
            const result = await Comment.update({
            comment: req.body.comment,
        }, {
            where: { id: req.params.id },
        });
        res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })

    // 댓글 삭제 라우터
    .delete(async (req, res, next) => {
        try {
            const result = await Comment.destroy({ where: { id: req.params.id } });
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;