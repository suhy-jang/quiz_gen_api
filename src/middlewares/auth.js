const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const User = require('../models/User');
const createError = require('http-errors');

exports.auth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }
  console.log('cookie', req.cookies);

  if (!token) return next(createError(401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(createError(401));
  }
});
