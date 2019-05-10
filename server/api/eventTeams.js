const router = require('express').Router()
const {Event, EventTeam, Task} = require('../db/models')
module.exports = router

// Get a single event a team signed up for
// Note: the way this route is set up is eventId, followed by teamId
// Think of like the name of the model: eventTeam, so event then team
// So just make sure to follow the protocol
router.get('/event/:eventId/team/:teamId', async (req, res, next) => {
  try {
    const {teamId, eventId} = req.params
    const eventTeam = await EventTeam.findOne({
      where: {
        teamId,
        eventId
      }
    })
    res.json(eventTeam)
  } catch (err) {
    next(err)
  }
})

router.get('/event/:eventId/team/:teamId/:status', async (req, res, next) => {
  try {
    const {teamId, eventId} = req.params;
    const status = req.params.status.toUpperCase();
    const eventTeam = await EventTeam.findAll({
      where: {
        teamId,
        eventId,
        status
      }
    })
    res.json(eventTeam)
  } catch (err) {
    next(err)
  }
})

// Get the event a team has joined and a copy of its tasks
router.get('/event/:eventId/team/:teamId/tasks', async (req, res, next) => {
  try {
    const {teamId, eventId} = req.params
    const eventTeam = await EventTeam.findOne({
      where: {
        teamId,
        eventId
      },
      include: {
        model: Task
      }
    })
    res.json(eventTeam)
  } catch (err) {
    next(err)
  }
})

// Have a team join an event
router.post('/', async (req, res, next) => {
  try {
    const {teamId, eventId} = req.body
    const event = await Event.findOne({
      where: {
        id: eventId
      }
    })
    if (event.isActive) {
      const tasks = await Task.findAll({
        where: {
          eventId: eventId
        }
      })
      const eventTeam = await EventTeam.create({teamId, eventId})
      eventTeam.addTasks(tasks)
      res.json(eventTeam)
    } else {
      res.status(401).send('This Event is Inactive')
    }
  } catch (err) {
    next(err)
  }
})

// Remove a team from an event
router.delete('/', async (req, res, next) => {
  try {
    const {teamId, eventId} = req.body
    const eventTeam = await EventTeam.findOne({
        where: {
            teamId,
            eventId
        }
    });
    eventTeam.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err)
  }
})

// Starts the event
// Will not allow more than one "ACTIVE" event
router.put('/event/:eventId/team/:teamId/activate', async (req, res, next) => {
  try {
    const {teamId, eventId} = req.params;
    const check = await EventTeam.findOne({
      where: {
        status: "ACTIVE"
      }
    });
    if (check) res.status(401).send('Only one event can be active at a time');
    const eventTeam = await EventTeam.findOne({
      where: {
        teamId,
        eventId
      }
    });
    const event = await Event.findOne({
        where: {
            id: eventId
        }
    });
    await eventTeam.startEvent(event.duration);
    res.json(eventTeam);
  } catch (err) {
    next(err)
  }
})

// deactivates a team event
router.put('/event/:eventId/team/:teamId/deactivate', async (req, res, next) => {
  try {
    const {teamId, eventId} = req.params;
    const eventTeam = await EventTeam.findOne({
      where: {
        teamId,
        eventId
      }
    });
    await eventTeam.deactivateEvent();
    res.json(eventTeam);
  } catch (err) {
    next(err)
  }
})

// Completes an event
router.put('/event/:eventId/team/:teamId/complete', async (req, res, next) => {
  try {
    const {teamId, eventId} = req.params
    const eventTeam = await EventTeam.findOne({
      where: {
        teamId,
        eventId
      }
    })
    await eventTeam.update({status: "COMPLETED"})
    res.json(eventTeam)
  } catch (err) {
    next(err)
  }
})
