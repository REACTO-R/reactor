const Sequelize = require('sequelize')
const db = require('../db')

const SubTopic = db.define('SubTopic', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	MainTopicId: {
		type: Sequelize.INTEGER
	}
})

module.exports = SubTopic