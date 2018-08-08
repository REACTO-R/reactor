const Sequelize = require('sequelize')
const db = require('../db')

const QuestionList = db.define('QuestionList', {
	text: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	RQuestion: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	EQuestion: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	AQuestion: {
		type: Sequelize.Text,
		allowNull: false
	},
	QuestionId: {
		type: Sequelize.INTEGER
	}
})

module.exports = QuestionList