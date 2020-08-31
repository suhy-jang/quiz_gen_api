const createError = require('http-errors');
const Classroom = require('../models/Classroom');
const asyncHandler = require('../middlewares/async');

// @desc    Create a classroom
// @route   POST /api/v1/classrooms
// @access  Private
exports.createClassroom = asyncHandler(async (req, res, next) => {
  const classroom = await Classroom.create({ teacher: req.user.id });
  res.status(201).json({ success: true, data: classroom });
});

// @desc    Get all classrooms
// @route   GET /api/v1/classrooms
// @access  Private
exports.getClassrooms = asyncHandler(async (req, res, next) => {
  const findParams = req.user.role === 'admin' ? {} : { teacher: req.user.id };
  const classrooms = await Classroom.find(findParams);
  res.status(200).json({ success: true, data: classrooms });
});

// @desc    Get single classroom
// @route   GET /api/v1/classroom/:id
// @access  Private
exports.getClassroom = asyncHandler(async (req, res, next) => {
  const classroom = await Classroom.findById(req.params.id);
  if (req.user.role !== 'admin' && classroom.teacher.toString() !== req.user.id)
    return next(createError(403));
  res.status(200).json({ success: true, data: classroom });
});

// @desc    Delete a classroom
// @route   DELETE /api/v1/classrooms/:id
// @access  Private
exports.deleteClassroom = asyncHandler(async (req, res, next) => {
  const classroom = await Classroom.findById(req.params.id);
  if (req.user.role !== 'admin' && classroom.teacher.toString() !== req.user.id)
    return next(createError(403));
  const result = await classroom.remove();
  res.status(200).json({ success: true, data: result });
});
