const mongoose = require('mongoose');

const ClassroomBrockerSchema = new mongoose.Schema(
  {},
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('ClassroomBrocker', ClassroomBrockerSchema);
