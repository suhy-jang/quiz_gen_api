const createError = require('http-errors');
const Classroom = require('../models/Classroom');
const asyncHandler = require('../middlewares/async');

// @desc    Create a classroom
// @route   POST /api/v1/classrooms
// @access  Private
exports.createClassroom = asyncHandler(async (req, res, next) => {
  // login with teacher role
  // create with teacher id
  let classroom = new Classroom(req.body);
  classroom = await classroom.save();
  res.status(201).json({ success: true, data: classroom });
});

// @desc    Get all classrooms
// @route   GET /api/v1/classrooms
// @access  Private
exports.getClassrooms = asyncHandler(async (req, res, next) => {
  // find by teacher id
  const classrooms = await Classroom.find();
  res.status(200).json({ success: true, data: classrooms });
});

// @desc    Get single classroom
// @route   GET /api/v1/classroom/:id
// @access  Private
exports.getClassroom = asyncHandler(async (req, res, next) => {
  const classroom = await Classroom.findById(req.params.id);
  // validation: classroom.teacher
  res.status(200).json({ success: true, data: classroom });
});

// @desc    Delete a classroom
// @route   DELETE /api/v1/classrooms/:id
// @access  Private
exports.deleteClassroom = asyncHandler(async (req, res, next) => {
  const classroom = await Classroom.findById(req.params.id);
  if (!classroom) return next(createError(404));
  // validation: classroom.teacher
  const result = await classroom.remove();
  if (!result) return next(createError(400));

  res.status(204).json({ success: true });
});
