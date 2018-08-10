const Sequelize = require('sequelize')
const db = require('../db')

const CTStuff = db.define('CTStuff', {
	Input: {
		type: Sequelize.TEXT
	},
	Output: {
		type: Sequelize.TEXT
	}
})

module.exports = CTStuff