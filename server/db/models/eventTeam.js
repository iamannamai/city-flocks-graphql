const Sequelize = require('sequelize')
const db = require('../db')
const Op = Sequelize.Op;

// An event team represents a team participating in an event
const EventTeam = db.define('event_team', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  beginTime: {
    type: Sequelize.BIGINT,
    defaultValue: null
  },
  endTime: {
    type: Sequelize.BIGINT,
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
  return this;
}

EventTeam.prototype.findAllByStatus = async function(teamId, status) {
  const where = { teamId };

  if (status === 'COMPLETED' || status === 'ACTIVE') {
    where.status = status;
  } else if (status === 'UPCOMING') {
    where.status = {
      [Op.in]: ['ACTIVE', 'PENDING']
    }
  }

  const events = await EventTeam.findAll({ where });
  return events;
}

module.exports = EventTeam
