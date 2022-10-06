const mongoose = require('mongoose');

const questionSchema = mongoose.Schema(
	{
		question: {
			type: String,
			required: [true, 'Please add a question'],
		},
		options: [
			{
				type: String,
				required: [true, 'Please add options'],
			},
		],
		topic: {
			type: String,
			required: [true, 'Please add a topic'],
		},
		answer: {
			type: Number,
			required: [true, 'Please select an answer'],
		},
		time: {
			type: Number,
			required: [true, 'Please add time'],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Question', questionSchema);
