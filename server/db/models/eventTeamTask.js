const Sequelize = require('sequelize')
const db = require('../db')

const EventTeamTask = db.define('event_team_task', {
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = EventTeamTask
