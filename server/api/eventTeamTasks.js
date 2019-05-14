const router = require('express').Router()
const {EventTeamTask} = require('../db/models')
module.exports = router

// Get a single task from a single event a team signed up for
// Note: If you haven't seen the note on eventTeam's routes
// know that the route is made so that it's eventId, then teamId, and finally taskId
// Think of like the name of the model: eventTeamTask, so event then team then task
// So just make sure to follow the protocol
router.get('/eventTeam/:eventTeamId/task/:taskId', async (req, res, next) => {
  try {
    const {eventTeamId, taskId} = req.params
    const eventTeamTask = await EventTeamTask.findOne({
      where: {
        eventTeamId: eventTeamId,
        taskId
      }
    });
    res.json(eventTeamTask);
  } catch (err) {
    next(err);
  }
})

// Toggle a task between complete and incomplete states
router.put('/', async (req, res, next) => {
  try {
    const { eventTeamId, taskId, completed } = req.body;
    const eventTeamTask = await EventTeamTask.findOne({
      where: {
        eventTeamId,
        taskId
      }
    });
    eventTeamTask.update({
      completed
    });
    res.json(eventTeamTask);
  } catch (err) {
    next(err)
  }
})
