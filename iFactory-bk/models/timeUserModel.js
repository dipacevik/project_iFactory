const mongoose = require('mongoose');
const User = require('./userModel');

const TimeUserSchema = new mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: [true, 'A user Id must be setted'],
	},
	startTime: {
		type: Date,
		default: Date.now,
	},
	endTime: Date,
	createdAt: {
		type: Date,
		default: Date.now,
		select: false,
	},
});

const TimeUser = mongoose.model('TimeUser', TimeUserSchema);
module.exports = TimeUser;
