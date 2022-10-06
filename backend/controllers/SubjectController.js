const asyncHandler = require('express-async-handler');

const Subject = require('../models/SubjectModel');

// @desc Get Subjects
// @route GET /api/subjects
// @access Private
const getSubjects = asyncHandler(async (req, res) => {
	const subjects = await Subject.find();
	res.status(200).json(subjects);
});

// @desc Get Subject
// @route GET /api/subject/:id
// @access Private
const getSubject = asyncHandler(async (req, res) => {
	const subject = await Subject.findById(req.params.id);

	res.status(200).json(subject);
});

// @desc Set Subject
// @route POST /api/subject
// @access Private
const setSubject = asyncHandler(async (req, res) => {
	if (!req.body) {
		res.status(400);
		throw new Error('Please add subject');
	}

	const subject = await Subject.create(req.body);

	res.status(200).json(subject);
});

// @desc Update Subject
// @route PUT /api/subject/:id
// @access Private
const updateSubject = asyncHandler(async (req, res) => {
	const subject = await Subject.findById(req.params.id);

	if (!subject) {
		res.status(400);
		throw new Error('Subject not found');
	}

	const updatedSubject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json(updatedSubject);
});

// @desc Delete Subject
// @route GET /api/subject/:id
// @access Private
const deleteSubject = asyncHandler(async (req, res) => {
	const subject = await Subject.findById(req.params.id);

	if (!subject) {
		res.status(400);
		throw new Error('Subject not found');
	}

	await subject.remove();
	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getSubjects,
	getSubject,
	setSubject,
	updateSubject,
	deleteSubject,
};
