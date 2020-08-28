const express = require('express');
const router = express.Router();
const {
  getProblems,
  getProblem,
  createProblem,
  updateProblem,
  deleteProblem,
} = require('../controllers/problems');

router.route('/').get(getProblems).post(createProblem);
router.route('/:id').get(getProblem).patch(updateProblem).delete(deleteProblem);

module.exports = router;
