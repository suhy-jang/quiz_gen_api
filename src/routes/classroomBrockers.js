const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  createClassroomBrocker,
  deleteClassroomBrocker,
} = require('../controllers/classroomBrockers');
const { authenticate, authorize } = require('../middlewares/auth');

router
  .route('/')
  .post(authenticate, authorize('teacher', 'admin'), createClassroomBrocker);

router
  .route('/:id')
  .delete(authenticate, authorize('teacher', 'admin'), deleteClassroomBrocker);

module.exports = router;
