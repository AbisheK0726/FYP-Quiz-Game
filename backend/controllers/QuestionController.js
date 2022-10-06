const asyncHandler = require('express-async-handler');

const Question = require('../models/QuestionModel');

// @desc Get Questions
// @route GET /api/questions
// @access Private
const getQuestions = asyncHandler(async (req, res) => {
	const questions = await Question.find();
	res.status(200).json(questions);
});

// @desc Get Questions
// @route GET /api/questions/topic/:topic
// @access Private
const getQuestionsByTopic = asyncHandler(async (req, res) => {
	const selectedQuestions = await Question.find({ topic: req.params.topic });
	res.status(200).json(selectedQuestions);
});

// @desc Get Question
// @route GET /api/question/:id
// @access Private
const getQuestion = asyncHandler(async (req, res) => {
	const question = await Question.findById(req.params.id);
	res.status(200).json(question);
});

// @desc Set Question
// @route POST /api/question
// @access Private
const setQuestion = asyncHandler(async (req, res) => {
	if (!req.body) {
		res.status(400);
		throw new Error('Please add question');
	}
	const question = await Question.create(req.body);

	res.status(200).json(question);
});

// @desc Update Question
// @route PUT /api/question/:id
// @access Private
const updateQuestion = asyncHandler(async (req, res) => {
	const question = await Question.findById(req.params.id);

	if (!question) {
		res.status(400);
		throw new Error('Question not found');
	}

	const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json(updatedQuestion);
});

// @desc Delete Question
// @route GET /api/question/:id
// @access Private
const deleteQuestion = asyncHandler(async (req, res) => {
	const question = await Question.findById(req.params.id);

	if (!question) {
		res.status(400);
		throw new Error('Question not found');
	}

	await question.remove();
	res.status(200).json({ text: 'Question removed' });
});

module.exports = {
	getQuestions,
	getQuestionsByTopic,
	getQuestion,
	setQuestion,
	updateQuestion,
	deleteQuestion,
};
