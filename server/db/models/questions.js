const Sequelize = require('sequelize')
const db = require('../db')

const Question = db.define('Question', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	SubTopicId: {
		type: Sequelize.INTEGER
	}
})

module.exports = Question