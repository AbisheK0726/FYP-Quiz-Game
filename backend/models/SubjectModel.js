const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema(
	{
		subject: {
			type: String,
			required: [true, 'Please add a subject'],
		},
		icon: {
			type: String,
			required: [true, 'Please add an icon'],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Subject', subjectSchema);
