const Sequelize = require('sequelize')
const db = require('../db')

const UserQuestions = db.define('userQuestions', {
	questionId: {
		type: Sequelize.INTEGER,
	},
	RQuestion: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	EQuestion: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	AQuestion: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	AQuestionApproach: {
		type: Sequelize.INTEGER
	},
	CTQuestion: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	CTAnswer: {
		type: Sequelize.TEXT,
	}
})

module.exports = UserQuestions;