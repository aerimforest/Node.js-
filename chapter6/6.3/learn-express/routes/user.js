const express = require('express');
const { route } = require('.');

const router = express.Router();

// GEt /user 라우터
router.get('/', (req, res) => {
    res.send('Hello, User');
});

module.exports = router;