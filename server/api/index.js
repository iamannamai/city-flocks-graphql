const router = require('express').Router()
module.exports = router

router.use('/events', require('./events'))
router.use('/tasks', require('./tasks'))
router.use('/teams', require('./teams'))
router.use('/users', require('./users'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
