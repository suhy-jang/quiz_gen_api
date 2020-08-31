const createError = require('http-errors');
const ClassroomBrocker = require('../models/ClassroomBrocker');
const asyncHandler = require('../middlewares/async');

// @desc    Create a classroomBrocker
// @route   POST /api/v1/classrooms/:classroomId/students
// @access  Private
exports.createClassroomBrocker = asyncHandler(async (req, res, next) => {
  req.body.classroom = req.params.classroomId;
  const classroomBrocker = await ClassroomBrocker.create(req.body);
  res.status(201).json({ success: true, data: classroomBrocker });
});

// @desc    Delete a classroomBrocker
// @route   DELETE /api/v1/classroomBrockers/:id
// @access  Private
exports.deleteClassroomBrocker = asyncHandler(async (req, res, next) => {
  const classroomBrocker = await ClassroomBrocker.findById(
    req.params.id
  ).populate({
    path: 'classroom',
    select: 'teacher',
  });
  if (!classroomBrocker) return next(createError(404));
  if (
    req.user.role !== 'admin' &&
    classroomBrocker.classroom.teacher.toString() !== req.user.id
  ) {
    return next(createError(403));
  }

  await classroomBrocker.remove();
  res.status(200).json({ success: true, data: {} });
});
