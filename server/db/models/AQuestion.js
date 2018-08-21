const Sequelize = require('sequelize')
const db = require('../db')

const AQuestion = db.define('AQuestion', {
	correct: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	answerText: {
		type: Sequelize.TEXT,
	},
	explanationText: {
		type: Sequelize.TEXT,
	},
	optimizationText: {
		type: Sequelize.TEXT,
	},
	optimizationCode: {
		type: Sequelize.TEXT,
		defautlValue: "No solution code yet! Check back later!",
	},
	optimizationGraph: {
		type: Sequelize.TEXT,
	}
})

module.exports = AQuestion