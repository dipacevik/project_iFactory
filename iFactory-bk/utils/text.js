require('./connection');
const FactoryItem = require('./../models/factoryItemModel')

const test = async() =>{
	await FactoryItem.create({
		title: `${Math.random()*100}`,
		type:"aaa",
		note: "bryeuh",
		schedule: {
			feeding: {
				status: true,
				scheduledTime: new Date()
			}
		}
	})
}

test();