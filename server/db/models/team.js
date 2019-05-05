const Sequelize = require('sequelize');
const db = require('../db');

const Team = db.define('team', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
});

module.exports = Team;
