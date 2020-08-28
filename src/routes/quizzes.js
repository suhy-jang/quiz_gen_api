const express = require('express');
const router = express.Router();
const { getQuizzes } = require('../controllers/quizzes');

router.route('/').get(getQuizzes);

module.exports = router;
