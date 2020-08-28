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
    min: [1, 'Score must be at least 1'],
    max: [3, 'Score cannot be more than 3'],
    enum: [1, 2, 3],
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

ProblemSchema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
  const update = this.getUpdate() || this;
  update.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Problem', ProblemSchema);
