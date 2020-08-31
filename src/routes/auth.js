const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updateRole,
  updatePassword,
  unregister,
} = require('../controllers/auth');
const { authenticate } = require('../middlewares/auth');
const quizBrockerRouter = require('./quizBrockers');

// Include other resource routers
router.use('/quizzes', quizBrockerRouter);

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getMe);
router.patch('/update-details', authenticate, updateDetails);
router.patch('/update-role', authenticate, updateRole);
router.patch('/update-password', authenticate, updatePassword);
router.delete('/unregister', authenticate, unregister);

module.exports = router;
