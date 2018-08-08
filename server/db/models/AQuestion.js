const Sequelize = require('sequelize')
const db = require('../db')

const AQuestion = db.define('AQuestion', {
	text: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	correct: {
		type: Sequelize.BOOLEAN,
	},
	answerText: {
		type: Sequelize.TEXT,
	},
	explanationText: {
		type: Sequelize.TEXT,
	},
	OptimizationText: {
		type: Sequelize.TEXT,
	},
	QuestionId: {
		type: Sequelize.INTEGER
	}
})

module.exports = AQuestion