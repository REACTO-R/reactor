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
		defaultValue: "No solution code yet! Check back later!",
	},
	optimizationGraph: {
		type: Sequelize.TEXT,
		defaultValue: `{"label": "O(n)","borderDash": [5,20],"data": [0, 5, 10, 15, 20, 25], "backgroundColor":"rgba(0, 0, 0, 0)", "borderColor": "rgba(255,0,0,1)", "borderWidth": 1}`
	}
})

module.exports = AQuestion