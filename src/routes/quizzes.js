const express = require('express');
const router = express.Router();
const {
  createQuiz,
  getQuizzes,
  getQuiz,
  updateQuiz,
  deleteQuiz,
} = require('../controllers/quizzes');

router.route('/').get(getQuizzes).post(createQuiz);
router.route('/:id').get(getQuiz).patch(updateQuiz).delete(deleteQuiz);

module.exports = router;
