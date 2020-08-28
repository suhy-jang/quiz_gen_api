const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Please add a question'],
    trim: true,
  },
  solution: {
    type: String,
    required: [true, 'Please add a solution'],
    trim: true,
  },
  score_weight: {
    type: Number,
    default: 1,
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

module.exports = mongoose.model('Problem', ProblemSchema);
