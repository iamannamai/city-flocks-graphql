const router = require('express').Router()
const {Event, Task} = require('../db/models')
module.exports = router

// Get all events
router.get('/', async (req, res, next) => {
  try {
    const events = await Event.findAll({})
    res.json(events)
  } catch (err) {
    next(err)
  }
})

// Get single event
router.get('/:id', async (req, res, next) => {
  try {
    const eventId = parseInt(req.params.id, 10)
    const event = await Event.findOne({
      where: {
        id: eventId
      }
    })
    res.json(event)
  } catch (err) {
    next(err)
  }
})

// Get single event and its tasks
router.get('/:id/tasks', async (req, res, next) => {
  try {
    const eventId = parseInt(req.params.id, 10)
    const event = await Event.findOne({
      where: {
        id: eventId
      },
      include: {
        model: Task
      }
    })
    res.json(event)
  } catch (err) {
    next(err)
  }
})

// Create event
router.post('/', async (req, res, next) => {
  try {
    const name = req.params.name
    const event = await Event.create({name})
    res.json(event)
  } catch (err) {
    next(err)
  }
})

// Add task to event
router.post('/:eventId/addTask/:taskId', async (req, res, next) => {
  try {
    const {eventId, taskId} = req.params
    const task = await Task.findOne({where: {id: taskId}})
    const event = Event.findOne({where: {id: eventId}})
    await task.setEvent(event)
    event.addTask(task)
    res.json(event)
  } catch (err) {
    next(err)
  }
})
