// Core Modules
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');

// Error handling
const { AppError } = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const factoryRouter = require('./routes/factoryRoutes');

const app = express();

// Middlewares
// if (process.env.NODE_ENV === 'development') {
app.use(morgan('dev'));
// }

app.use(express.static(`${__dirname}/public`));

app.use(helmet());

app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

// CORS handling
// app.use(
// 	cors({
// 		origin: '*',
// 		allowedHeaders: [
// 			'Content-Type',
// 			'Authorization',
// 			'Access-Control-Allow-Methods',
// 			'Access-Control-Request-Headers',
// 		],
// 		credentials: true,
// 		enablePreflight: true,
// 	})
// );

app.use('/api/user/', userRouter);
app.use('/api/factory/', factoryRouter);

// Unknown page handler
app.all('*', (req, res, next) =>
	next(
		new AppError({
			message: `Cannot find ${req.originalUrl} on this server`,
			statusCode: 404,
		})
	)
);

app.use(globalErrorHandler);

module.exports = app;
