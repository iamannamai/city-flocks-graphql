const router = require('express').Router()
const {Team, User} = require('../db/models')
module.exports = router

// Get all teams
router.get('/', async (req, res, next) => {
  try {
    const teams = await Team.findAll({})
    res.json(teams)
  } catch (err) {
    next(err)
  }
})

// Get single team
router.get('/:id', async (req, res, next) => {
  try {
    const teamId = parseInt(req.params.id, 10)
    const team = await Team.findOne({
      where: {
        id: teamId
      }
    })
    res.json(team)
  } catch (err) {
    next(err)
  }
})

// Get single team and its users
router.get('/:id/users', async (req, res, next) => {
  try {
    const teamId = parseInt(req.params.id, 10)
    const team = await Team.findOne({
      where: {
        id: teamId
      },
      include: {
        model: User,
        attributes: ['id', 'username', 'email']
      }
    })
    res.json(team)
  } catch (err) {
    next(err)
  }
})

// Create team
router.post('/', async (req, res, next) => {
  try {
    const name = req.params.name
    const team = await Team.create({name})
    res.json(team)
  } catch (err) {
    next(err)
  }
})

// Add player to team
router.post('/:teamId/addUser/:userId', async (req, res, next) => {
  try {
    const {teamId, userId} = req.params
    const user = await User.findOne({where: {id: userId}})
    const team = Team.findOne({where: {id: teamId}})
    await user.setTeam(team)
    team.addUser(user)
    res.json(team)
  } catch (err) {
    next(err)
  }
})
