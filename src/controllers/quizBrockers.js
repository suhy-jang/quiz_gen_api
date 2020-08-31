const createError = require('http-errors');
const QuizBrocker = require('../models/QuizBrocker');
const asyncHandler = require('../middlewares/async');

// @desc    Create a quizBrocker
// @route   POST /api/v1/quizzes/:quizId/students
// @access  Private
exports.createQuizBrocker = asyncHandler(async (req, res, next) => {
  req.body.quiz = req.params.quizId;
  const quizBrocker = await QuizBrocker.create(req.body);
  res.status(201).json({ success: true, data: quizBrocker });
});

// @desc    Get quizBrockers
// @route   GET /api/v1/quizzes/:quizId/students
// @route   GET /api/v1/auth/quizzes
// @access  Private
exports.getQuizBrockers = asyncHandler(async (req, res, next) => {
  const { quizId } = req.params;
  let query;
  if (quizId) {
    query = QuizBrocker.find({ quiz: quizId }).populate({
      path: 'student',
      select: 'name email score mobile_number',
    });
  } else if (req.user.role === 'admin') {
    query = QuizBrocker.find();
  } else {
    query = QuizBrocker.find({ student: req.user.id }).populate({
      path: 'quiz',
      select: 'expire',
      populate: [
        {
          path: 'teacher',
          select: 'name email mobile_number',
        },
        {
          path: 'problems',
          select: 'question solution score_weight',
        },
      ],
    });
  }

  const quizBrockers = await query;
  res.status(200).json({ success: true, data: quizBrockers });
});

// @desc    Get single quizBrocker
// @route   GET /api/v1/quizBrockers/:id
// @access  Private
exports.getQuizBrocker = asyncHandler(async (req, res, next) => {
  const quizBrocker = await QuizBrocker.findById(req.params.id)
    .populate({
      path: 'student',
      select: 'name email score mobile_number',
    })
    .populate({
      path: 'quiz',
      select: 'question solution score_weight',
      populate: {
        path: 'teacher',
        select: 'name email mobile_number',
      },
    });
  if (!quizBrocker) return next(createError(404));
  if (
    quizBrocker.student.id !== req.user.id &&
    quizBrocker.quiz.teacher.id !== req.user.id
  )
    return next(createError(403));

  res.status(200).json({ success: true, data: quizBrocker });
});

// @desc    Update a quizBrocker
// @route   PATCH /api/v1/quizBrockers/:id
// @access  Private
exports.updateQuizBrocker = asyncHandler(async (req, res, next) => {
  const quizBrocker = await QuizBrocker.findById(req.params.id);
  if (quizBrocker.student.toString() !== req.user.id)
    return next(createError(403));
  if (quizBrocker.submission)
    return next(createError(400, 'Already submitted'));
  quizBrocker.submission = true;
  const result = await quizBrocker.save();
  res.status(200).json({ success: true, data: result });
});

// @desc    Delete a quizBrocker
// @route   DELETE /api/v1/quizBrockers/:id
// @access  Private
exports.deleteQuizBrocker = asyncHandler(async (req, res, next) => {
  const quizBrocker = await QuizBrocker.findById(req.params.id).populate(
    'quiz'
  );
  if (quizBrocker.quiz.teacher.toString() !== req.user.id)
    return next(createError(403));
  const result = await quizBrocker.remove();
  res.status(200).json({ success: true, data: result });
});
