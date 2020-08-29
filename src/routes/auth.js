const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
  unregister,
} = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', getMe);
router.patch('/update-details', updateDetails);
router.patch('/update-password', updatePassword);
router.delete('/unregister', unregister);

module.exports = router;
