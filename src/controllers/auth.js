const User = require('../models/User');
const asyncHandler = require('../middlewares/async');
const createError = require('http-errors');

// @desc    Register
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  sendTokenResponse(user, 201, res);
});

// @desc    Login
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).select(
    '+password'
  );
  if (!user) {
    return next(createError(401));
  }
  const authenticate = await user.authenticate(req.body.password);
  if (!authenticate) {
    return next(createError(401));
  }
  sendTokenResponse(user, 200, res);
});

// @desc    Logout
// @route   POST /api/v1/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, data: {} });
});

// @desc    Get me
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  // params -> req.user.id
  const user = await User.findById(req.params.id);
  sendTokenResponse(user, 200, res);
});

// @desc    Update user details
// @route   PATCH /api/v1/auth/update-details
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    mobile_number: req.body.mobile_number,
    role: req.body.role,
  };
  // params -> req.user.id
  const user = await User.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
    runValidators: true,
  });
  sendTokenResponse(user, 200, res);
});

// @desc    Update password
// @route   PATCH /api/v1/auth/update-password
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  // params -> req.user.id
  const user = await User.findById(req.params.id).select('+password');

  if (!(await user.authenticate(currentPassword))) {
    return next(createError(401));
  }
  user.password = newPassword;
  user.save();
  sendTokenResponse(user, 200, res);
});

// @desc    Unregister
// @route   DELETE /api/v1/auth/unregister
// @access  Private
exports.unregister = asyncHandler(async (req, res, next) => {
  // params -> req.user.id
  await User.findByIdAndDelete(req.params.id);
  sendTokenResponse(user, 204, res);
});

const sendTokenResponse = (user, code, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(code)
    .cookie('token', token, options)
    .json({ success: true, token });
};
