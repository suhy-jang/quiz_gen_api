const mongoose = require('mongoose');

const QuizBrockerSchema = new mongoose.Schema(
  {
    submission: {
      type: Boolean,
      default: false,
    },
    quiz: {
      type: mongoose.Schema.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    student: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('QuizBrocker', QuizBrockerSchema);
