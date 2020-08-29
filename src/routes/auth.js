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

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getMe);
router.patch('/update-details', authenticate, updateDetails);
router.patch('/update-role', authenticate, updateRole);
router.patch('/update-password', authenticate, updatePassword);
router.delete('/unregister', authenticate, unregister);

module.exports = router;
