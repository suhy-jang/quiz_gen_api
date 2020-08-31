const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getProblems,
  getProblem,
  createProblem,
  updateProblem,
  deleteProblem,
} = require('../controllers/problems');
const { authenticate, authorize } = require('../middlewares/auth');

router
  .route('/')
  .get(authenticate, authorize('teacher', 'admin'), getProblems)
  .post(authenticate, authorize('teacher'), createProblem);

router
  .route('/:id')
  .get(authenticate, authorize('teacher', 'admin'), getProblem)
  .patch(authenticate, authorize('teacher', 'admin'), updateProblem)
  .delete(authenticate, authorize('teacher', 'admin'), deleteProblem);

module.exports = router;
