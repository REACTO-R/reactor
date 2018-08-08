const Sequelize = require('sequelize')
const db = require('../db')

const MainTopic = db.define('MainTopic', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
})

module.exports = MainTopic