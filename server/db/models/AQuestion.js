const Sequelize = require('sequelize')
const db = require('../db')

const AQuestion = db.define('AQuestion', {
	correct: {
		type: Sequelize.BOOLEAN,
	},
	answerText: {
		type: Sequelize.TEXT,
	},
	explanationText: {
		type: Sequelize.TEXT,
	},
	optimizationText: {
		type: Sequelize.TEXT,
	}
})

module.exports = AQuestion