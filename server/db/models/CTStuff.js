const Sequelize = require('sequelize')
const db = require('../db')

const CTStuff = db.define('CTStuff', {
	Code: {
		type: Sequelize.TEXT
	},
})

module.exports = CTStuff