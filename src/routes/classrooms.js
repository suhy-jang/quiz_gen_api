const express = require('express');
const router = express.Router();
const {
  createClassroom,
  getClassrooms,
  getClassroom,
  deleteClassroom,
} = require('../controllers/classrooms');

router.route('/').get(getClassrooms).post(createClassroom);
router.route('/:id').get(getClassroom).delete(deleteClassroom);

module.exports = router;
