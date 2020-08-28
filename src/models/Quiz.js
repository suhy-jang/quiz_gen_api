const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  expire: {
    type: Date,
    default: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Quiz', QuizSchema);
