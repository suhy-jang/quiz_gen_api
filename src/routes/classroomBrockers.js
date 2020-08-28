const express = require('express');
const router = express.Router();
const {
  createClassroomBrocker,
  getClassroomBrockers,
  getClassroomBrocker,
  deleteClassroomBrocker,
} = require('../controllers/classroomBrockers');

router.route('/').get(getClassroomBrockers).post(createClassroomBrocker);
router.route('/:id').get(getClassroomBrocker).delete(deleteClassroomBrocker);

module.exports = router;
