const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema(
  {},
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('Classroom', ClassroomSchema);
