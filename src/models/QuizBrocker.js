const mongoose = require('mongoose');

const QuizBrockerSchema = new mongoose.Schema(
  {
    submission: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('QuizBrocker', QuizBrockerSchema);
