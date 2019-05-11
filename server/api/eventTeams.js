const router = require('express').Router();
const {Event, EventTeam, Task} = require('../db/models');
module.exports = router;

// Get a single event a team signed up for
// Note: the way this route is set up is eventId, followed by teamId
// Think of like the name of the model: eventTeam, so event then team
// So just make sure to follow the protocol
router.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const eventTeam = await EventTeam.findByPk(id);
    // TODO: include tasks
    res.json(eventTeam);
  } catch (err) {
    next(err);
  }
});

// Get events for a team by a status. Supports querying COMPLETED, ACTIVE, UPCOMING (ACTIVE & PENDING), returns all by default
router.get('/team/:teamId', async (req, res, next) => {
  try {
    const teamId = parseInt(req.params.teamId, 10);
    const status = req.query.status.toUpperCase();
    const eventTeam = await EventTeam.findAllByStatus(teamId, status)
    res.json(eventTeam);
  } catch (err) {
    next(err);
  }
});

// Get the event a team has joined and a copy of its tasks
router.get('/:id/tasks', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const eventTeam = await EventTeam.findOne({
      where: {
        id
      },
      include: {
        model: Task
      }
    });
    res.json(eventTeam);
  } catch (err) {
    next(err);
  }
});

// Have a team join an event, add all event tasks to EventTeamTasks
router.post('/', async (req, res, next) => {
  try {
    const {teamId, eventId} = req.body;
    const event = await Event.findByPk(eventId);
    if (event.isActive) {
      const tasks = await Task.findAll({
        where: {
          eventId
        }
      });
      const eventTeam = await EventTeam.create({teamId, eventId});
      eventTeam.addTasks(tasks);
      res.json(eventTeam);
    } else {
      res.status(401).send('This Event is Inactive');
    }
  } catch (err) {
    next(err);
  }
});

// Remove a team from an event
router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const eventTeam = await EventTeam.findByPk(id);
    eventTeam.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// Starts the event
// Will not allow more than one "ACTIVE" event
router.put('/:id/activate', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const check = await EventTeam.findOne({
      where: {
        id,
        status: 'ACTIVE'
      }
    });
    if (check) res.status(400).send('Only one event can be active at a time');
    const eventTeam = await EventTeam.findByPk(id);
    const event = await Event.findOne({
      where: {
        id: eventTeam.eventId
      }
    });
    await eventTeam.startEvent(event.duration);
    await eventTeam.save();
    console.log(eventTeam);
    res.json(eventTeam);
  } catch (err) {
    next(err);
  }
});

// deactivates a team event
router.put('/:id/deactivate', async (req, res, next) => {
  try {
    const id = parseInt(req.params, 10);
    const eventTeam = await EventTeam.findByPk(id);
    await eventTeam.deactivateEvent();
    res.json(eventTeam);
  } catch (err) {
    next(err);
  }
});

// Completes an event
router.put('/:id/complete', async (req, res, next) => {
  try {
    const id = parseInt(req.params, 10);
    const eventTeam = await EventTeam.findByPk(id);
    await eventTeam.update({status: 'COMPLETED'});
    res.json(eventTeam);
  } catch (err) {
    next(err);
  }
});
