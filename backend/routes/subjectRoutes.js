const express = require('express');
const router = express.Router();
const { getSubjects, getSubject, setSubject, updateSubject, deleteSubject } = require('../controllers/SubjectController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getSubjects).post(protect, setSubject);
router.route('/:id').get(protect, getSubject).put(protect, updateSubject).delete(protect, deleteSubject);

module.exports = router;
