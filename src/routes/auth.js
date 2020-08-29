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
const { auth } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.get('/me', auth, getMe);
router.patch('/update-details', auth, updateDetails);
router.patch('/update-role', auth, updateRole);
router.patch('/update-password', auth, updatePassword);
router.delete('/unregister', auth, unregister);

module.exports = router;
