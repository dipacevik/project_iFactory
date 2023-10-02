const mongoose = require('mongoose');

const FactoryItemSchema = new mongoose.Schema({
	title: String,
	type: String,
	note: String,
	ambientalFactors: {
		soilStatus: { type: Number },
		soilWater: { type: Number },
	},
	schedule: {
		feeding: {
			status: { type: Boolean, default: false },
			scheduledTime: Date,
		},
		watering: {
			status: { type: Boolean, default: false },
			scheduledTime: Date,
		},
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const FactoryItem = mongoose.model('FactoryItem', FactoryItemSchema);
module.exports = FactoryItem;
