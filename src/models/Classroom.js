const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('Classroom', ClassroomSchema);
