const express = require('express');
const router = express.Router();

const getQuizzes = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all quizzes' });
};

router.route('/').get(getQuizzes);
module.exports = router;
