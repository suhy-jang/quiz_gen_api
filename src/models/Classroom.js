const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ClassroomSchema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
  const update = this.getUpdate() || this;
  update.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Classroom', ClassroomSchema);
