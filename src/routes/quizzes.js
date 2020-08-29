const express = require('express');
const router = express.Router();
const {
  createQuiz,
  getQuizzes,
  getQuiz,
  updateQuiz,
  deleteQuiz,
} = require('../controllers/quizzes');
const { authenticate, authorize } = require('../middlewares/auth');

router
  .route('/')
  .get(authenticate, authorize('teacher', 'admin'), getQuizzes)
  .post(authenticate, authorize('teacher'), createQuiz);
router
  .route('/:id')
  .get(authenticate, authorize('teacher', 'student', 'admin'), getQuiz)
  .patch(authenticate, authorize('teacher', 'admin'), updateQuiz)
  .delete(authenticate, authorize('teacher', 'admin'), deleteQuiz);

module.exports = router;
