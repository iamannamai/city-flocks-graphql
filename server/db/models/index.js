const User = require('./user');
const Team = require('./team');
const Event = require('./event');
const Task = require('./task');
const EventTeam = require('./eventTeam');
const EventTeamTask = require('./eventTeamTask');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// User belongsTo Team, Team hasMany User. User has FK teamId
User.belongsTo(Team);
Team.hasMany(User);

// Task belongsTo Event, Event hasMany Tasks. Task has FK eventId
Task.belongsTo(Event);
Event.hasMany(Task);

// Team belongsToMany Event, Event belongsToMany through EventTeam
Team.belongsToMany(Event, { through: EventTeam });
Event.belongsToMany(Team, { through: EventTeam });

// EventTeam hasMany Tasks, Task belongsToMany EventTeam
EventTeam.belongsToMany(Task, { through: EventTeamTask });
Task.hasMany(EventTeam, { through: EventTeamTask });

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Team,
  Event,
  Task,
  EventTeam,
  EventTeamTask
}
