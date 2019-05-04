const Sequelize = require('sequelize');
const db = require('../db');

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
  duration: {
    type: Sequelize.INTEGER,
    defaultValue: 2 * 60 * 60
  }
});

module.exports = Event;
