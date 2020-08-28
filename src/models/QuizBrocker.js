const mongoose = require('mongoose');

const QuizBrockerSchema = new mongoose.Schema({
  submission: {
    type: Boolean,
    default: false,
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

QuizBrockerSchema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
  const update = this.getUpdate() || this;
  update.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('QuizBrocker', QuizBrockerSchema);
