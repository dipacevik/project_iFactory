const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: [true, 'A user Id must be setted'],
	},
	description: {
		type: String,
		required: [true, 'A description for the task must be setted'],
	},
	todo: Date,
	status: {
		type: Boolean,
		default: false,
	},
	closedAt: Date,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
