const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
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
        validator: (v) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
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
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

UserSchema.pre('save', async function (next) {
  if (this.isModified('role')) {
    this.score = this.role === 'student' ? 0 : undefined;
    await this.model('Quiz').deleteMany({ teacher: this._id });
    await this.model('QuizBrocker').deleteMany({ student: this._id });
  }
  if (this.isModified('password')) {
    this.password = this.hashPassword(this.password);
  }
  next();
});

// Cascade delete quizzes when a teacher is deleted
UserSchema.pre('remove', async function (next) {
  await this.model('Quiz').deleteMany({ teacher: this._id });
  await this.model('QuizBrocker').deleteMany({ student: this._id });
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
  // Match user entered password to hashed password in database
  hashPassword: function (password) {
    return bcrypt.hashSync(password, 10);
  },
};

// Reverse populate with virtuals
UserSchema.virtual('assignedQuizzes', {
  ref: 'QuizBrocker',
  localField: '_id',
  foreignField: 'student',
  justOne: false,
  options: { sort: { updated_at: -1 } },
});

module.exports = mongoose.model('User', UserSchema);
