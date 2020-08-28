const express = require('express');
const quizzes = require('./routes/quizzes');
const problems = require('./routes/problems');
const errorHandler = require('./middlewares/error');
const app = express();

app.use(express.json());

app.use('/api/v1/quizzes', quizzes);
app.use('/api/v1/problems', problems);

app.use(errorHandler);

if (process.env.NODE_ENV === 'development') {
  app.use(require('morgan')('dev'));
}

module.exports = app;
