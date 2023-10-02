const mongoose = require('mongoose');
const FactoryItem = require('../models/factoryItemModel');
const catchAsync = require('../utils/catchAsync');
const sendSuccessResponse = require('../utils/sendSuccessResponse');
const moment = require('moment');

exports.getFactoryItems = catchAsync(async (req, res, next) => {
	const items = await FactoryItem.find();
	return sendSuccessResponse(res, 200, { status: 'success', data: items });
});

exports.addFactoryItem = catchAsync(async (req, res, next) => {
	const { title, type, note, soilStatus, soilWater, wateringTime, feedingTime } = req.body;
	const items = await FactoryItem.find({ title });
	if (items.length > 0) {
		return next('errore');
	}
	let data = { title, type, note };
	if (soilStatus && soilWater) {
		data = {
			...data,
			ambientalFactors: {
				soilStatus,
				soilWater,
			},
		};
	}
	if (wateringTime || feedingTime) {
		let schedule = null;
		if (wateringTime) {
			schedule = {
				...schedule,
				watering: {
					status: true,
					scheduledTime: new Date(wateringTime),
				},
			};
		}
		if (feedingTime) {
			schedule = {
				...schedule,
				feeding: {
					status: true,
					scheduledTime: new Date(feedingTime),
				},
			};
			data = { ...data, schedule };
		}
	}

	const item = await FactoryItem.create(data);
	return sendSuccessResponse(res, 200, { status: 'success', data: item });
});

exports.deleteFactoryItem = catchAsync(async (req, res, next) => {
	const { id } = req?.params;
	const item = await FactoryItem.findById(id);
	if (!item) {
		return next('errore');
	}
	await FactoryItem.findByIdAndDelete(id);
	return sendSuccessResponse(res, 200, { status: 'success' });
});
