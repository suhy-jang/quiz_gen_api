const createError = require('http-errors');

const errorHandler = (err, req, res, next) => {
  let error = {
    ...err,
    name: err.name,
    message: err.message,
    code: err.statusCode,
  };

  if (process.env.NODE_ENV === 'development') {
    console.log(`${error.message} | ${error.name}`.brightRed);
  }

  // console.log(err.statusCode);

  // mongoose bad ObjectId
  if (error.name === 'CastError' || error.name === 'NotFoundError') {
    error.code = 404;
    error.message = createError(error.code);
  } else if (error.name === 'ValidationError') {
    error.code = 400;
    error.message = createError(error.code);
  } else if (error.code === 11000) {
    // mongoose duplicate key
    error.code = 409;
    error.message = createError('Duplicated field value entered');
  } else if (error.code) {
    error.message = error.message || createError(error.code);
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
