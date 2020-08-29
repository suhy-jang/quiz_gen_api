const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    maxlength: [50, 'Name cannot be more than 50 characters'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    trim: true,
    validate: {
      validator: (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
      message: 'Email validation failed',
    },
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [8, 'Password should be minimum 8 characters'],
    select: false,
  },
  mobile_number: {
    type: String,
    default: '',
    maxlength: [11, 'Mobile number cannot be more than 11 digits'],
  },
  role: {
    type: String,
    enum: ['teacher', 'student'],
    default: 'student',
  },
  score: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('role')) {
    this.score = this.role === 'student' ? 0 : undefined;
  }
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

UserSchema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
  const update = this.getUpdate();
  if (update.password) {
    if (update.password.length < 8) return next(); // validation before encryption
    update.password = bcrypt.hashSync(update.password, 10);
  }
  update.updatedAt = Date.now();
  next();
});

UserSchema.methods = {
  getSignedJwtToken: function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  },
  // Match user entered password to hashed password in database
  authenticate: function (enteredPassword) {
    return bcrypt.compareSync(enteredPassword, this.password);
  },
};

module.exports = mongoose.model('User', UserSchema);
