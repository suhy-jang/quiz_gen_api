const express = require('express');
const createError = require('http-errors');
const quizzes = require('./routes/quizzes');
const problems = require('./routes/problems');
const errorHandler = require('./middlewares/error');
const app = express();

app.use(express.json());

app.use('/api/v1/quizzes', quizzes);
app.use('/api/v1/problems', problems);
app.all('*', (req, res, next) => next(createError(400)));

app.use(errorHandler);

if (process.env.NODE_ENV === 'development') {
  app.use(require('morgan')('dev'));
}

module.exports = app;
