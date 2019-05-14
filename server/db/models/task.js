const Sequelize = require('sequelize')
const db = require('../db')

const Task = db.define('task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING
  },
  points: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  keyPiece: {
    type: Sequelize.STRING
  }
})

module.exports = Task
