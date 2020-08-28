const createError = require('http-errors');
const Problem = require('../models/Problem');
const asyncHandler = require('../middlewares/async');

// @desc    Create a problem
// @route   POST /api/v1/problems
// @access  Private
exports.createProblem = asyncHandler(async (req, res, next) => {
  // login with teacher role
  // create with quiz id
  let problem = new Problem(req.body);
  problem = await problem.save();
  res.status(201).json({ success: true, data: problem });
});

// @desc    Get all problems
// @route   GET /api/v1/problems
// @access  Private
exports.getProblems = asyncHandler(async (req, res, next) => {
  // find by quiz id
  // validation: quiz.teacher or quizBroker.student
  const problems = await Problem.find();
  res.status(200).json({ success: true, data: problems });
});

// @desc    Get single problem
// @route   GET /api/v1/problem/:id
// @access  Private
exports.getProblem = asyncHandler(async (req, res, next) => {
  const problem = await Problem.findById(req.params.id);
  // validation: quiz.teacher or quizBroker.student
  res.status(200).json({ success: true, data: problem });
});

// @desc    Update a problem
// @route   PATCH /api/v1/problems/:id
// @access  Private
exports.updateProblem = asyncHandler(async (req, res, next) => {
  const problem = await Problem.findById(req.params.id);
  // validation: quiz.teacher
  const result = await Problem.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });
  res.status(201).json({ success: true, data: result });
});

// @desc    Delete a problem
// @route   DELETE /api/v1/problems/:id
// @access  Private
exports.deleteProblem = asyncHandler(async (req, res, next) => {
  const problem = await Problem.findById(req.params.id);
  if (!problem) return next(createError(404));
  // validation: quiz.teacher
  const result = await problem.remove();
  if (!result) return next(createError(400));

  res.status(204).json({ success: true });
});
