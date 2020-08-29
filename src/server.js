const express = require('express');
const createError = require('http-errors');
const quizzes = require('./routes/quizzes');
const problems = require('./routes/problems');
const quizBrockers = require('./routes/quizBrockers');
const classrooms = require('./routes/classrooms');
const classroomBrockers = require('./routes/classroomBrockers');
const users = require('./routes/users');
const errorHandler = require('./middlewares/error');
const app = express();

app.use(express.json());

app.use('/api/v1/quizzes', quizzes);
app.use('/api/v1/problems', problems);
app.use('/api/v1/quiz-brockers', quizBrockers);
app.use('/api/v1/classrooms', classrooms);
app.use('/api/v1/classroom-brockers', classroomBrockers);
app.use('/api/v1/users', users);
app.all('*', (req, res, next) => next(createError(400)));

app.use(errorHandler);

if (process.env.NODE_ENV === 'development') {
  app.use(require('morgan')('dev'));
}

module.exports = app;
