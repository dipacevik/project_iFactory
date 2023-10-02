const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const sendSuccessResponse = require('../utils/sendSuccessResponse');
const { promisify } = require('util');
const { AppError, errors } = require('../utils/appError');

const signToken = (user, uniqueId = null) => {
	const { _id: id } = user;
	const payload = { id };
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const createSendToken = (user, statusCode, req, res) => {
	const token = signToken(user, req?.body?.uniqueId);

	user.password = undefined;

	return sendSuccessResponse(res, statusCode, {
		status: 'success',
		token,
		data: { user },
	});
};

exports.signup = catchAsync(async (req, res, next) => {
	const { lastName, firstName, email, password, passwordConfirm } = req.body;

	if (password !== passwordConfirm) {
		return next(new AppError(errors.PASSORDS_NOT_CONFIRM));
	}
	const username = `${lastName}.${firstName}`.toLowerCase();
	const userNum = await User.count({ username: { $regex: `${username}.*` } });

	const newUser = await User.create({
		email,
		firstName,
		lastName,
		username: username + (userNum + 1),
		password,
		passwordConfirm,
	});

	createSendToken(newUser, 201, req, res);
});

/**
 * Restrict to -> check if user has roles
 * @param object roles
 * @return next()
 */
exports.restrictTo = (...roles) =>
	catchAsync(async (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(new AppError(errors.ACTION_RESTRICTED_ERROR));
		}
		next();
	});

exports.login = catchAsync(async (req, res, next) => {
	const { email, username, password } = req.body;

	// Params check
	if ((!email && !username) || !password) {
		return next(new AppError(errors.EMAIL_PASSWORD_MISSING_ERROR));
	}

	// User check
	const check = email ? { email: email.toLowerCase() } : { username: username.toLowerCase() };
	const user = await User.findOne(check).select('+password');
	if (!user) {
		return next(new AppError(errors.USER_NOT_FOUND_ERROR));
	}

	if (!(await user.correctPassword(password, user.password))) {
		return next(new AppError(errors.EMAIL_USER_PASSWORD_INCORRECT_ERROR));
	}

	createSendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
	let token;
	const isAuthorized = req.headers.authorization && req.headers.authorization.startsWith('Bearer');

	if (isAuthorized) {
		token = req.headers.authorization.split(' ')[1];
	} else {
		return next(new AppError(errors.AUTHORIZATION_NOT_PRESENT));
	}

	if (!token) {
		return next(new AppError(errors.UNAUTHORIZED_USER_ERROR));
	}
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	const currentUser = await User.findById(decoded.id).select('+password');
	if (!currentUser) {
		return next(new AppError(errors.TOKEN_NOT_EXISTING_ERROR));
	}

	req.user = currentUser;
	next();
});

exports.isLoggedIn = async (req, res, next) => {
	if (!req.user) {
		return next(new AppError(errors.USER_NOT_LOGGED_ERROR));
	}
	return sendSuccessResponse(res, 200, {
		status: 'success',
		data: { user: req.user },
	});
};

exports.logout = catchAsync(async (req, res, next) => {
	return sendSuccessResponse(res, 200, { status: 'success' });
});
