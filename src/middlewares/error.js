const createError = require('http-errors');

const errorHandler = (err, req, res, next) => {
  let error = { ...err, name: err.name, message: err.message };

  if (process.env.NODE_ENV === 'development') {
    console.log(`${error.message} | ${error.name}`.brightRed);
  }

  // mongoose bad ObjectId
  if (error.name === 'CastError' || error.name === 'NotFoundError') {
    error.code = 404;
    error.message = createError(error.code);
  } else if (error.name === 'ValidationError') {
    const messages = error.message.split(':');
    error.code = 400;
    error.message = createError(messages[messages.length - 1]);
  } else if (error.code === 11000) {
    // mongoose duplicate key
    error.code = 409;
    error.message = createError('Duplicated field value entered');
  } else {
    error.code = 500;
    error.message = createError(error.code);
  }

  res.status(error.code).json({
    success: false,
    error: error.message,
  });
};

module.exports = errorHandler;
