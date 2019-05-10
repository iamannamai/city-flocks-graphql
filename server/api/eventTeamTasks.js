const router = require('express').Router()
const {EventTeam,EventTeamTask} = require('../db/models')
module.exports = router

// Get a single task from a single event a team signed up for
// Note: If you haven't seen the note on eventTeam's routes
// know that the route is made so that it's eventId, then teamId, and finally taskId
// Think of like the name of the model: eventTeamTask, so event then team then task
// So just make sure to follow the protocol
router.get('/event/:eventId/team/:teamId/task/:taskId', async (req, res, next) => {
  try {
    const {teamId, eventId, taskId} = req.params
    const eventTeam = await EventTeam.findOne({
        where: {
            teamId,
            eventId
        }
    })
    const eventTeamTask = await EventTeamTask.findOne({
      where: {
        eventTeamId: eventTeam.id,
        taskId
      }
    })
    res.json(eventTeamTask)
  } catch (err) {
    next(err)
  }
})

// Toggle a task between complete and incomplete states
router.put('/event/:eventId/team/:teamId/task/:taskId', async (req, res, next) => {
  try {
    const {teamId, eventId, taskId} = req.params;
    const eventTeam = await EventTeam.findOne({
        where: {
            teamId,
            eventId
        }
    })
    const eventTeamTask = await EventTeamTask.findOne({
      where: {
        eventTeamId: eventTeam.id,
        taskId
      }
    })
    eventTeamTask.update({
        completed: !eventTeamTask.completed
    })
    res.json(eventTeamTask);
  } catch (err) {
    next(err)
  }
})
