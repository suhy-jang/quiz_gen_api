const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema(
  {
    expire: {
      type: Date,
      default: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    },
    teacher: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('Quiz', QuizSchema);
