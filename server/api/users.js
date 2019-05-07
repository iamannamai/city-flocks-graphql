const router = require('express').Router()
const {Team,User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// Get all teamless users
router.get('/available', async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {
        teamId: null
      },
      attributes: ['id', 'username', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id, 10)
    const user = await User.findOne({
      where: {
        id: userId
      },
      attributes: ['id', 'username', 'email','teamId']
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// Get single user with assigned team
router.get('/:id/team', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id, 10)
    const user = await User.findOne({
      where: {
        id: userId
      },
      include: {
        model: Team
      },
      attributes: ['id', 'username', 'email']
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// Leave team
router.put('/:id/team', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id, 10)
    const user = await User.findOne({
      where: {
        id: userId
      },
      attributes: ['id', 'username', 'email']
    })
    await user.setTeam(null)
    res.json(user)
  } catch (err) {
    next(err)
  }
})
