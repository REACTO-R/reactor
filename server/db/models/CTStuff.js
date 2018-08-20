const Sequelize = require('sequelize')
const db = require('../db')

const CTStuff = db.define('CTStuff', {
	Input: {
		type: Sequelize.TEXT,
		validate: {
			isArray(value) {
				if (value[0] !== "[" && value[value.length-1] !== "]") {
					throw new Error("Must be an array string!")
				}
			}
		}
	},
	Output: {
		type: Sequelize.TEXT
	}
})

module.exports = CTStuff