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

  // mongoose bad ObjectId
  if (error.name === 'CastError') {
    error.code = 404;
    error.message = createError(error.code);
  } else if (error.name === 'ValidationError') {
    error.code = 400;
    const [, , ...messages] = error.message.split(':');
    if (error.message.includes('`') || error.message.includes('"')) {
      error.message = createError(error.name);
    } else {
      const message = messages.map((v) => v.split(',')[0].trim());
      error.message = { message };
    }
  } else if (error.code === 11000 || error.message.includes('duplicate')) {
    // mongoose duplicate key
    const field = Object.keys(error.keyPattern)[0] || 'field';
    error.code = 409;
    error.message = createError(`Duplicated ${field}`);
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
