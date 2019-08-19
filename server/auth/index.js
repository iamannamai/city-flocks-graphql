const router = require('express').Router();
const User = require('../db/models/user');
const {Team} = require('../db/models/');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {username: req.body.username},
      include: {model: Team}
    });
    if (!user) {
      console.log('No such user found:', req.body.username);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.username);
      res.status(401).send('Wrong username and/or password');
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const {username, email, password} = req.body;
    const createUser = {
      username,
      email,
      password
    };
    const user = await User.create(createUser);
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));
