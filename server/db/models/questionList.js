const Sequelize = require('sequelize')
const db = require('../db')

const QuestionList = db.define('QuestionList', {
	RQuestion: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	EQuestion: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	AQuestion: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	AQuestionConsideration: {
		type: Sequelize.TEXT,
	},
})

module.exports = QuestionList