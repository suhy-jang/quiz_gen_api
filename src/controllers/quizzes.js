const createError = require('http-errors');
const asyncHandler = require('../middlewares/async');
const Quiz = require('../models/Quiz');

// @desc    Create a quiz
// @route   POST /api/v1/quizzes
// @access  Private
exports.createQuiz = asyncHandler(async (req, res, next) => {
  const quiz = await Quiz.create({ ...req.body, teacher: req.user.id });
  res.status(201).json({ success: true, data: quiz });
});

// @desc    Get quizzes
// @route   GET /api/v1/quizzes
// @access  Private
exports.getQuizzes = asyncHandler(async (req, res, next) => {
  const findOptions = req.user.role === 'admin' ? {} : { teacher: req.user.id };
  const quizzes = await Quiz.find(findOptions)
    .populate({
      path: 'problems',
      select: 'question solution score_weight',
    })
    .populate({
      path: 'quizBrockers',
      select: 'student submission',
      populate: {
        path: 'student',
        select: 'name score',
      },
    });
  res.status(200).json({ success: true, data: quizzes });
});

// @desc    Get single quiz
// @route   GET /api/v1/quizzes/:id
// @access  Private
exports.getQuiz = asyncHandler(async (req, res, next) => {
  const quiz = await getQuizIfAuthorized(req, next);
  if (!quiz) return;
  res.status(200).json({ success: true, data: quiz });
});

// @desc    Update a quiz
// @route   PATCH /api/v1/quizzes/:id
// @access  Private
exports.updateQuiz = asyncHandler(async (req, res, next) => {
  const quiz = await getQuizIfAuthorized(req, next);
  if (!quiz) return;
  const result = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });
  res.status(200).json({ success: true, data: result });
});

// @desc    Delete a quiz
// @route   DELETE /api/v1/quizzes/:id
// @access  Private
exports.deleteQuiz = asyncHandler(async (req, res, next) => {
  const quiz = await getQuizIfAuthorized(req, next);
  if (!quiz) return;
  quiz.remove();
  res.status(204).json({ success: true });
});

// Get a quiz when it is authorized
const getQuizIfAuthorized = async function (req, next) {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) return next(createError(404));
  if (quiz.teacher != req.user.id && req.user.role !== 'admin')
    return next(createError(403));
  return quiz;
};
