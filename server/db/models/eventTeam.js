const Sequelize = require('sequelize');
const db = require('../db');

// An event team represents a team participating in an event
const EventTeam = ('event_team', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  beginTime: {
    type: Sequelize.INTEGER
  }
});

module.exports = EventTeam;
