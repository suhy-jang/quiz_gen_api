const express = require('express');
const quizzes = require('./routes/quizzes');

const app = express();
app.use('/api/v1/quizzes', quizzes);

if (process.env.NODE_ENV === 'development') {
  app.use(require('morgan')('dev'));
}

module.exports = app;
