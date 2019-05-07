const router = require('express').Router()
const {Task} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.findAll({})
    res.json(tasks)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id, 10)
    const task = await Task.findOne({
      where: {
        id: taskId
      }
    })
    res.json(task)
  } catch (err) {
    next(err)
  }
})
