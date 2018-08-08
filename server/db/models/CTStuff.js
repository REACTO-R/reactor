const Sequelize = require('sequelize')
const db = require('../db')

const CTStuff = db.define('CTStuff', {
	QuestionId: {
		type: Sequelize.INTEGER
	},
	Code: {
		type: Sequelize.TEXT
	},
})

module.exports = CTStuff