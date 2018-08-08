const Sequelize = require('sequelize')
const db = require('../db')

const EQuestion = db.define('EQuestion', {
	correct: {
		type: Sequelize.BOOLEAN,
	},
	answerText: {
		type: Sequelize.TEXT,
	},
	explanationText: {
		type: Sequelize.TEXT,
	},
	QuestionId: {
		type: Sequelize.INTEGER
	}
})

module.exports = EQuestion