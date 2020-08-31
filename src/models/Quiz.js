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
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Cascade delete problems when a quiz is deleted
QuizSchema.pre('remove', async function (next) {
  await this.model('Problem').deleteMany({ quiz: this._id });
  await this.model('QuizBrocker').deleteMany({ quiz: this._id });
  next();
});

// Reverse populate with virtuals
QuizSchema.virtual('problems', {
  ref: 'Problem',
  localField: '_id',
  foreignField: 'quiz',
  justOne: false,
  options: { sort: { created_at: -1 } },
});

QuizSchema.virtual('quizBrockers', {
  ref: 'QuizBrocker',
  localField: '_id',
  foreignField: 'quiz',
  justOne: false,
  options: { sort: { created_at: -1 } },
});

module.exports = mongoose.model('Quiz', QuizSchema);
