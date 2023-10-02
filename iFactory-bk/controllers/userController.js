const Task = require('../models/taskModel');
const TimeUser = require('../models/timeUserModel');
const User = require('../models/userModel');
const { AppError, errors } = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const sendSuccessResponse = require('../utils/sendSuccessResponse');
const moment = require('moment');

exports.getAllUsers = catchAsync(async (req, res, next) => {
	const date = moment().format('YYYY-MM-DD');
	const checkInit = new Date(`${date} 00:00:00`);
	const checkEnd = new Date(`${date} 23:59:59`);
	let users = await User.find({ role: 'user' });
	users = users.map(async (user) => {
		const workLogs = await TimeUser.findOne({
			user: user._id,
			startTime: { $gte: checkInit, $lte: checkEnd },
		});
		return { ...user.toObject(), logs: workLogs };
	});
	users = await Promise.all(users);
	return sendSuccessResponse(res, 200, {
		status: 'success',
		data: users,
	});
});

exports.addUser = catchAsync(async (req, res, next) => {
	const { email, firstName, lastName, username, password, active } = req.body;

	const newUser = await User.create({
		email: email,
		firstName: firstName,
		lastName: lastName,
		username: username,
		password: password,
		passwordConfirm: password,
		active: true,
	});

	return sendSuccessResponse(res, 200, {
		status: 'success',
		data: newUser,
	});
});

exports.getTimeLogs = catchAsync(async (req, res, next) => {
	const date = moment().format('YYYY-MM-DD');
	const checkInit = new Date(`${date} 00:00:00`);
	const checkEnd = new Date(`${date} 23:59:59`);
	const time = await TimeUser.findOne({
		user: req.user._id,
		startTime: { $gte: checkInit, $lte: checkEnd },
	});

	return sendSuccessResponse(res, 200, {
		status: 'success',
		data: time,
	});
});

exports.addTimeLogs = catchAsync(async (req, res, next) => {
	const date = moment().format('YYYY-MM-DD');
	const checkInit = new Date(`${date} 00:00:00`);
	const checkEnd = new Date(`${date} 23:59:59`);
	let time = await TimeUser.findOne({
		user: req.user._id,
		startTime: { $gte: checkInit, $lte: checkEnd },
	});
	if (time) {
		return next(new AppError(errors.TIME_EXIST));
	}
	time = await TimeUser.create({ user: req.user._id });
	return sendSuccessResponse(res, 200, {
		status: 'success',
		data: time,
	});
});

exports.closeTimeLogs = catchAsync(async (req, res, next) => {
	const date = moment().format('YYYY-MM-DD');
	const checkInit = new Date(`${date} 00:00:00`);
	const checkEnd = new Date(`${date} 23:59:59`);
	let time = await TimeUser.findOne({
		user: req.user._id,
		startTime: { $gte: checkInit, $lte: checkEnd },
	});
	if (!time) {
		return next(new AppError(errors.TIME_NOT_EXIST));
	}

	time.endTime = Date.now();
	await time.save();

	time = await TimeUser.findOne({
		user: req.user._id,
		startTime: { $gte: checkInit, $lte: checkEnd },
		endTime: { $gte: checkInit, $lte: checkEnd },
	});

	return sendSuccessResponse(res, 200, {
		status: 'success',
		data: time,
	});
});

exports.getUserTask = catchAsync(async (req, res, next) => {
	const task = await Task.find({ user: req.user.id, status: false });
	return sendSuccessResponse(res, 200, {
		status: 'success',
		data: task,
	});
});

exports.getTaskByUser = catchAsync(async (req, res, next) => {
	const { userId } = req.body;
	const task = await Task.find({ user: userId, status: false });
	return sendSuccessResponse(res, 200, {
		status: 'success',
		data: task,
	});
});

exports.addUserTask = catchAsync(async (req, res, next) => {
	const { userId, description, todo } = req.body;
	let data = { user: userId, description };
	if (todo) {
		data.todo = new Date(todo);
	}
	let task = await Task.findOne(data);
	if (task) {
		return next(new AppError(errors.DUPLICATED_TASK));
	}

	task = await Task.create(data);
	if (!task) {
		return next(new AppError(errors.CANNOT_CREATE_TASK));
	}
	return sendSuccessResponse(res, 200, {
		status: 'success',
		data: task,
	});
});

exports.updateUserTask = catchAsync(async (req, res, next) => {
	const { id } = req?.params;
	let task = await Task.findById(id);
	if (!task) {
		return next(new AppError(errors.TASK_NOT_FOUND));
	}
	task.status = true;
	task.closedAt = new Date();
	await task.save();
	return sendSuccessResponse(res, 200, {
		status: 'success',
		data: await Task.findById(id),
	});
});

exports.deleteTask = catchAsync(async (req, res, next) => {
	const { id } = req?.params;
	let task = await Task.findByIdAndDelete(id);
	if (!task) {
		return next(new AppError(errors.TASK_NOT_FOUND));
	}
	return sendSuccessResponse(res, 200, {
		status: 'success',
	});
});
