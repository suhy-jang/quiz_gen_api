const createError = require('http-errors');
const ClassroomBrocker = require('../models/ClassroomBrocker');
const asyncHandler = require('../middlewares/async');

// @desc    Create a classroomBrocker
// @route   POST /api/v1/classroomBrockers
// @access  Private
exports.createClassroomBrocker = asyncHandler(async (req, res, next) => {
  // login with teacher role
  // create with teacher id
  let classroomBrocker = new ClassroomBrocker(req.body);
  classroomBrocker = await classroomBrocker.save();
  res.status(201).json({ success: true, data: classroomBrocker });
});

// @desc    Get all classroomBrockers
// @route   GET /api/v1/classroomBrockers
// @access  Private
exports.getClassroomBrockers = asyncHandler(async (req, res, next) => {
  // find by teacher id
  const classroomBrockers = await ClassroomBrocker.find();
  res.status(200).json({ success: true, data: classroomBrockers });
});

// @desc    Get single classroomBrocker
// @route   GET /api/v1/classroomBrocker/:id
// @access  Private
exports.getClassroomBrocker = asyncHandler(async (req, res, next) => {
  const classroomBrocker = await ClassroomBrocker.findById(req.params.id);
  // validation: classroomBrocker.teacher
  res.status(200).json({ success: true, data: classroomBrocker });
});

// @desc    Delete a classroomBrocker
// @route   DELETE /api/v1/classroomBrockers/:id
// @access  Private
exports.deleteClassroomBrocker = asyncHandler(async (req, res, next) => {
  const classroomBrocker = await ClassroomBrocker.findById(req.params.id);
  if (!classroomBrocker) return next(createError(404));
  // validation: classroomBrocker.teacher
  const result = await classroomBrocker.remove();
  if (!result) return next(createError(400));

  res.status(204).json({ success: true });
});
