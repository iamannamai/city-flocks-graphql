const Sequelize = require('sequelize');
const db = require('../db');
const Event = require('./event');

// An event team represents a team participating in an event
const EventTeam = ('event_team', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  beginTime: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  endTime: {
    type: Sequelize.INTEGER,
    defaultValue: null
  }
});

module.exports = EventTeam;

// EventTeam.prototype.startEvent = function() {
//   const event = Event.findByPk(this.eventId);
//   const {duration} = event;
//   const now = Date.now();

//   this.beginTime = now;
//   this.endTime = now + duration;

//   EventTeam.update(this);
// };
