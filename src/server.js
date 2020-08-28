const express = require('express');
const quizzes = require('./routes/quizzes');

const app = express();
app.use('/api/v1/quizzes', quizzes);

module.exports = app;
