const Sequelize = require('sequelize')
const db = require('../db')

const Question = db.define('Question', {
	text: {
		type: Sequelize.STRING,
		allowNull: false
	}
})

module.exports = Question