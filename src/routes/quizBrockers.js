const express = require('express');
const router = express.Router();
const {
  createQuizBrocker,
  getQuizBrockers,
  getQuizBrocker,
  updateQuizBrocker,
  deleteQuizBrocker,
} = require('../controllers/quizBrockers');

router.route('/').get(getQuizBrockers).post(createQuizBrocker);
router
  .route('/:id')
  .get(getQuizBrocker)
  .patch(updateQuizBrocker)
  .delete(deleteQuizBrocker);

module.exports = router;
