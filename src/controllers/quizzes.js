const createError = require('http-errors');
const Quiz = require('../models/Quiz');
const asyncHandler = require('../middlewares/async');

// @desc    Create a quiz
// @route   POST /api/v1/quizzes
// @access  Private
exports.createQuiz = asyncHandler(async (req, res, next) => {
  // login with teacher role
  // create with teacher id
  let quiz = new Quiz(req.body);
  quiz = await quiz.save();
  res.status(201).json({ success: true, data: quiz });
});

// @desc    Get quizzes
// @route   GET /api/v1/quizzes
// @access  Private
exports.getQuizzes = asyncHandler(async (req, res, next) => {
  // find by teacher id
  // validation: quiz.teacher
  const quizzes = await Quiz.find();
  res.status(200).json({ success: true, data: quizzes });
});

// @desc    Get single quiz
// @route   GET /api/v1/quizzes/:id
// @access  Private
exports.getQuiz = asyncHandler(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);
  // validation: quiz.teacher or quizBroker.student
  res.status(200).json({ success: true, data: quiz });
});

// @desc    Update a quiz
// @route   PATCH /api/v1/quizzes/:id
// @access  Private
exports.updateQuiz = asyncHandler(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);
  // validation: quiz.teacher
  const result = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });
  res.status(200).json({ success: true, data: result });
});

// @desc    Delete a quiz
// @route   DELETE /api/v1/quizzes/:id
// @access  Private
exports.deleteQuiz = asyncHandler(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);
  // validation: quiz.teacher
  const result = await quiz.remove();
  if (!result) return next(createError(400));

  res.status(204).json({ success: true });
});
