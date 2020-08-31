const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  createQuizBrocker,
  getQuizBrockers,
  getQuizBrocker,
  updateQuizBrocker,
  deleteQuizBrocker,
} = require('../controllers/quizBrockers');
const { authenticate, authorize } = require('../middlewares/auth');

router
  .route('/')
  .get(authenticate, authorize('student', 'admin'), getQuizBrockers)
  .post(authenticate, authorize('teacher'), createQuizBrocker);

router
  .route('/:id')
  .get(authenticate, authorize('student', 'admin'), getQuizBrocker)
  .patch(authenticate, authorize('student'), updateQuizBrocker)
  .delete(authenticate, authorize('teacher', 'admin'), deleteQuizBrocker);

module.exports = router;
