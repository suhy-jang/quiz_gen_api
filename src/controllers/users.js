const createError = require('http-errors');
const User = require('../models/User');
const asyncHandler = require('../middlewares/async');

// admin role

// @desc    Create a user
// @route   POST /api/v1/users
// @access  Public
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({ success: true, data: user });
});

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, data: users });
});

// @desc    Get single user
// @route   GET /api/v1/users/:id
// @access  Private
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({ success: true, data: user });
});

// @desc    Update a user
// @route   PATCH /api/v1/users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  // save: to access construct methods
  for (const [k, v] of Object.entries(req.body)) {
    user[k] = v;
  }
  const updatedUser = await user.save();
  if (!updatedUser) {
    return next(createError(403));
  }
  res.status(201).json({ success: true, data: updatedUser });
});

// @desc    Delete a user
// @route   DELETE /api/v1/users/:id
// @access  Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).json({ success: true });
});
