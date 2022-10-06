const mongoose = require('mongoose');
const roomSchema = mongoose.Schema(
	{
		teacher: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please add a teacher'],
		},
		subject: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Subject',
		},
		students: [
			{
				id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
				score: Number,
			},
		],
		questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
		name: {
			type: String,
			required: [true, 'Please add a class name'],
		},
		year: {
			type: Number,
			required: [true, 'Please add a class year'],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Room', roomSchema);
