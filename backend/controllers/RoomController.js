const asyncHandler = require('express-async-handler');
const Room = require('../models/RoomModel');

// @desc    Get rooms the user is in
// @route   GET /api/rooms/
// @access  Private
const getRooms = asyncHandler(async (req, res) => {
	let rooms;
	let roomsArr = [];

	if (req.user.role === 'teacher') {
		rooms = await Room.find({ teacher: req.user.id }).populate('teacher questions subject');
	} else if (req.user.role === 'student') {
		rooms = await Room.find({ 'students.id': req.user.id }).populate('teacher questions subject');
	}
	rooms.map((room) => {
		roomsArr.push({
			id: room.id,
			score: req.user.role === 'student' && room.students.find((student) => student.id.toString() === req.user.id).score,
			teacher: room.teacher.lastName,
			subject: room.subject?.subject,
			name: room.name,
			year: room.year,
			icon: room.subject?.icon || 'AiOutlineQuestion',
			topic: room.questions[0]?.topic,
		});
	});

	res.status(200).json(roomsArr);
});

// @desc    Get specific room
// @route   GET /api/rooms/:id
// @access  Private
const getRoom = asyncHandler(async (req, res) => {
	const room = await Room.findById(req.params.id).populate('students.id questions');
	const student = room.students.find((s) => s.id._id.toString() === req.user.id);

	// if a score for a student exists
	if (room) {
		res.status(200).json(room);
	} else {
		res.status(401);
		throw new Error('User not authorized');
	}
});

// @desc Update Room
// @route PUT /api/rooms/:id
// @access Private
const updateRoom = asyncHandler(async (req, res) => {
	const room = await Room.findById(req.params.id);

	if (!room) {
		res.status(400);
		throw new Error('Room not found');
	}

	const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body);

	res.status(200).json(updatedRoom);
});

// @desc    Post student score
// @route   PUT /api/rooms/:id
// @access  Private
const addScore = asyncHandler(async (req, res) => {
	const score = await Room.findOneAndUpdate({ _id: req.params.id, 'students.id': req.user.id }, { $set: { 'students.$.score': req.body.score } });
	if (!score) {
		res.status(400);
		throw new Error('Score not found');
	}

	res.status(200).json(score);
});

module.exports = {
	getRooms,
	getRoom,
	updateRoom,
	addScore,
};
