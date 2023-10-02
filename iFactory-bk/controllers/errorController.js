const { AppError, errors: appErrors } = require('../utils/appError');

const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}`;
	return new AppError(message, 400);
};

const handleDuplicateErrorDB = (err) => {
	const value = err.message.match(/(["'])(?:\\.|[^\\])*?\1/)[0];
	const message = `Duplicate field value ${value}, please use another value`;
	return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
	const errors = Object.values(err?.errors).map((el) => el?.message);
	const message = `Invalid input data ${errors.join('.')}`;
	return new AppError(message, 400);
};

const handleJWTError = () => new AppError(appErrors.TOKEN_INVALID);

const handleJWTExpiredError = () => new AppError(appErrors.TOKEN_EXPIRED);

const sendErrorDev = (err, res) => {
	console.log(err);
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		error: err,
		stack: err.stack,
	});
};

const sendErrorProd = (err, res) => {
	// Operational, trusted error: send message to client
	console.log(err);
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	} else {
		// Programming or unknown error: don't leak error details
		// console.error('Error 😬');
		res.status(500).json({
			status: 'error',
			message: err,
		});
	}
};

const saveLog = async (error, req) => {
	if (req.body.uniqueId) {
		await AppLog.create({
			url: req?.originalUrl,
			method: req?.method,
			message: error?.message,
			statusCode: error?.statusCode,
			user: req?.user?._id ? req?.user?._id : undefined,
			handled: error?.isOperational,
		});
	}
};

/**
 * Middleware used as error handler in app.js
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	saveLog(err, req);

	if (process.env.NODE_ENV === 'development') {
		sendErrorDev(err, res);
	} else if (process.env.NODE_ENV === 'production') {
		let error = { ...err };
		error.message = err.message;

		if (err.name === 'CastError') error = handleCastErrorDB(error);
		if (err.code === 11000) error = handleDuplicateErrorDB(err);
		if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
		if (err.name === 'JsonWebTokenError') error = handleJWTError();
		if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

		sendErrorProd(error, res);
	}
};
