const Sequelize = require('sequelize')
const db = require('../db')

const Question = db.define('Question', {
	text: {
		type: Sequelize.STRING,
		allowNull: false
	},
	unguidedOptimize: {
		type: Sequelize.TEXT,
		defaultValue: "Unguided optimize code being worked on, sorry!"
	},
	unguidedSolution: {
		type: Sequelize.TEXT,
		defaultValue: "No solution currently posted, check in later!"
	}
})

module.exports = Question