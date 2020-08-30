const createError = require('http-errors');
const asyncHandler = require('../middlewares/async');
const Problem = require('../models/Problem');
const Quiz = require('../models/Quiz');

// @desc    Create a problem
// @route   POST /api/v1/quizzes/:quizId/problems
// @access  Private
exports.createProblem = asyncHandler(async (req, res, next) => {
  const quiz = await getQuizIfAuthorized(req, next);
  if (!quiz) return;
  req.body.quiz = req.params.quizId;
  req.body.teacher = req.user.id;
  const problem = await Problem.create(req.body);
  res.status(201).json({ success: true, data: problem });
});

// @desc    Get all problems
// @route   POST /api/v1/problems
// @route   GET /api/v1/quizzes/:quizId/problems
// @access  Private
exports.getProblems = asyncHandler(async (req, res, next) => {
  let query;
  const queryParams = {};

  if (req.user.role !== 'admin') {
    queryParams.teacher = req.user.id;
  }
  if (req.params.quizId) {
    queryParams.quiz = req.params.quizId;
  }

  query = Problem.find(queryParams);

  const problems = await query;
  res.status(200).json({ success: true, data: problems });
});

// @desc    Get single problem
// @route   GET /api/v1/problem/:id
// @access  Private
exports.getProblem = asyncHandler(async (req, res, next) => {
  const problem = await getProblemIfAuthorized(req, next);
  if (!problem) return;
  // validation: quiz.teacher or quizBroker.student
  res.status(200).json({ success: true, data: problem });
});

// @desc    Update a problem
// @route   PATCH /api/v1/problems/:id
// @access  Private
exports.updateProblem = asyncHandler(async (req, res, next) => {
  const problem = await getProblemIfAuthorized(req, next);
  if (!problem) return;
  const result = await Problem.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });
  res.status(201).json({ success: true, data: result });
});

// @desc    Delete a problem
// @route   DELETE /api/v1/problems/:id
// @access  Private
exports.deleteProblem = asyncHandler(async (req, res, next) => {
  const problem = await getProblemIfAuthorized(req, next);
  if (!problem) return;
  await problem.remove();
  res.status(204).json({ success: true });
});

// Get a quiz when it is authorized
const getQuizIfAuthorized = async function (req, next) {
  const quiz = await Quiz.findById(req.params.quizId);
  if (!quiz) return next(createError(404));
  if (quiz.teacher.toString() !== req.user.id && req.user.role !== 'admin')
    return next(createError(403));
  return quiz;
};

// Get a problem when it is authorized
const getProblemIfAuthorized = async function (req, next) {
  let query;
  query = Problem.findById(req.params.id);
  const problem = await query;
  if (!problem) return next(createError(404));
  if (problem.teacher.toString() !== req.user.id && req.user.role !== 'admin')
    return next(createError(403));
  return problem;
};
