const mongoose = require('mongoose');

const ClassroomBrockerSchema = new mongoose.Schema(
  {
    classroom: {
      type: mongoose.Schema.ObjectId,
      ref: 'Classroom',
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

module.exports = mongoose.model('ClassroomBrocker', ClassroomBrockerSchema);
