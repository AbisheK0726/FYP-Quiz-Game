const express = require('express');
const router = express.Router();
const { getQuestions, getQuestion, setQuestion, updateQuestion, deleteQuestion, getQuestionsByTopic } = require('../controllers/QuestionController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getQuestions).post(protect, setQuestion);
router.route('/topic/:topic').get(protect, getQuestionsByTopic);
router.route('/:id').get(protect, getQuestion).put(protect, updateQuestion).delete(protect, deleteQuestion);

module.exports = router;
