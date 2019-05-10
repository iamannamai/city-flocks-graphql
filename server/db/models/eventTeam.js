const Sequelize = require('sequelize')
const db = require('../db')

// An event team represents a team participating in an event
const EventTeam = db.define('event_team', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  beginTime: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  endTime: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  status: {
    type: Sequelize.ENUM(['PENDING','ACTIVE','COMPLETED']),
    defaultValue: 'PENDING'
  }
})

EventTeam.prototype.deactivateEvent = function() {
  this.status = "PENDING";
  this.beginTime = null;
  this.endTime = null;
}

EventTeam.prototype.startEvent = function(duration) {
  this.status = "ACTIVE";
  this.beginTime = Date.now();
  this.endTime = this.beginTime + (duration * 1000);
}

module.exports = EventTeam

// EventTeam.prototype.startEvent = function() {
//   const event = Event.findByPk(this.eventId);
//   const {duration} = event;
//   const now = Date.now();

//   this.beginTime = now;
//   this.endTime = now + duration;

//   EventTeam.update(this);
// };