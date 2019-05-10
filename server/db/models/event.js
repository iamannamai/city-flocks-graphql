const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  location: {
    type: Sequelize.STRING
  },
  latitude: {
    type: Sequelize.FLOAT
  },
  longitude: {
    type: Sequelize.FLOAT
  },
  latitudeDelta: {
    type: Sequelize.FLOAT
  },
  longitudeDelta: {
    type: Sequelize.FLOAT
  },
  duration: {
    type: Sequelize.INTEGER,
    defaultValue: 2 * 60 * 60,
    allowNull: false
  }
})


module.exports = Event
