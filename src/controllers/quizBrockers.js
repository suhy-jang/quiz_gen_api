const createError = require('http-errors');
const QuizBrocker = require('../models/QuizBrocker');
const asyncHandler = require('../middlewares/async');

// @desc    Create a quizBrocker
// @route   POST /api/v1/quizBrockers
// @access  Private
exports.createQuizBrocker = asyncHandler(async (req, res, next) => {
  // login with teacher role
  // create with teacher id
  let quizBrocker = new QuizBrocker(req.body);
  quizBrocker = await quizBrocker.save();
  res.status(201).json({ success: true, data: quizBrocker });
});

// @desc    Get quizBrockers
// @route   GET /api/v1/quizBrockers
// @access  Private
exports.getQuizBrockers = asyncHandler(async (req, res, next) => {
  // find by teacher id
  // validation: quizBrocker.teacher
  const quizBrockers = await QuizBrocker.find();
  res.status(200).json({ success: true, data: quizBrockers });
});

// @desc    Get single quizBrocker
// @route   GET /api/v1/quizBrockers/:id
// @access  Private
exports.getQuizBrocker = asyncHandler(async (req, res, next) => {
  const quizBrocker = await QuizBrocker.findById(req.params.id);
  // validation: quizBrocker.teacher or quizBroker.student
  res.status(200).json({ success: true, data: quizBrocker });
});

// @desc    Update a quizBrocker
// @route   PATCH /api/v1/quizBrockers/:id
// @access  Private
exports.updateQuizBrocker = asyncHandler(async (req, res, next) => {
  const quizBrocker = await QuizBrocker.findById(req.params.id);
  // validation: quizBrocker.teacher
  const result = await QuizBrocker.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });
  res.status(200).json({ success: true, data: result });
});

// @desc    Delete a quizBrocker
// @route   DELETE /api/v1/quizBrockers/:id
// @access  Private
exports.deleteQuizBrocker = asyncHandler(async (req, res, next) => {
  const quizBrocker = await QuizBrocker.findById(req.params.id);
  // validation: quizBrocker.teacher
  if (!quizBrocker) return next(createError(404));
  const result = await quizBrocker.remove();
  if (!result) return next(createError(400));

  res.status(204).json({ success: true });
});
