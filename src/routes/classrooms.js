const express = require('express');
const router = express.Router();
const {
  createClassroom,
  getClassrooms,
  getClassroom,
  deleteClassroom,
} = require('../controllers/classrooms');
const { authenticate, authorize } = require('../middlewares/auth');

const classroomBrockerRouter = require('./classroomBrockers');

// Include other resource routers
router.use('/:classroomId/students', classroomBrockerRouter);

router
  .route('/')
  .get(authenticate, authorize('teacher', 'admin'), getClassrooms)
  .post(authenticate, authorize('teacher'), createClassroom);

router
  .route('/:id')
  .get(authenticate, authorize('teacher', 'admin'), getClassroom)
  .delete(authenticate, authorize('teacher', 'admin'), deleteClassroom);

module.exports = router;
