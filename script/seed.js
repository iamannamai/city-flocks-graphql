'use strict'

const db = require('../server/db')
const {Event, Task, Team, User} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({username: 'cody', email: 'cody@email.com', password: '123'}),
    User.create({
      username: 'murphy',
      email: 'murphy@email.com',
      password: '123'
    }),
    User.create({username: 'abu', email: 'abu@email.com', password: '123'}),
    User.create({username: 'anna', email: 'anna@email.com', password: '123'}),
    User.create({username: 'danny', email: 'danny@email.com', password: '123'}),
    User.create({username: 'juan', email: 'juan@email.com', password: '123'}),
    User.create({username: 'dio', email: 'dio@email.com', password: '123'}),
    User.create({username: 'fuku', email: 'fuku@email.com', password: '123'}),
  ])

  console.log(`seeded ${users.length} users`)

  const teams = await Promise.all([
    Team.create({name: 'Team 1'}),
    Team.create({name: 'Team 2'})
  ])

  await teams[0].addUsers([users[0], users[2], users[4]])
  await teams[1].addUsers([users[1], users[3], users[5]])

  console.log(`seeded ${teams.length} teams`)

  const tasks = await Promise.all([
    Task.create({
      name: 'Charging Bull',
      description: 'Grab the bull by the horns',
      latitude: 40.7055648,
      longitude: -74.0156334,
      address: 'New York, NY 10004',
      points: 600,
      keyPiece: 'LL'
    }),
    Task.create({
      name: 'New York Stock Exchange',
      description: 'Stand upon the steps of big business',
      latitude: 40.7054428,
      longitude: -74.013037,
      address: '11 Wall St, New York, NY 10005',
      points: 400,
      keyPiece: 'RA'
    }),
    Task.create({
      name: 'Burger King',
      description: 'The MOST IMPORTANT place to visit in FiDi',
      latitude: 40.704475,
      longitude: -74.0122002,
      address: '16 Beaver St, New York, NY 10004',
      points: 5000,
      keyPiece: 'BK'
    }),
    Task.create({
      name: 'National Museum of the American Indian',
      description:
        'Take some time to study the past, lest we doom ourselves to repeat it',
      latitude: 40.7040058,
      longitude: -74.0158784,
      address: '1 Bowling Green, New York, NY 10004',
      points: 800
    }),
    Task.create({
      name: 'Staten Island Ferry',
      description:
        "Get through the gates, but don't board. We wouldn't want you to prematurely end your game",
      latitude: 40.7022,
      longitude: -74.0128,
      address: '4 South St, New York, NY 10004',
      points: 1200
    }),
    Task.create({
      name: 'Starbucks',
      description:
        'An important foundation in American life, order one of our Veinte Matcha Frappuccinos only $18',
      latitude: 40.7029133,
      longitude: -74.0122323,
      address: 'One Battery Park Plaza, New York, NY 10004',
      points: 4000
    }),
    Task.create({
      name: 'Task 1',
      description: 'Corner of Oasis and the building',
      latitude: 40.704966,
      longitude: -74.008944,
      address: '10 Hanover Square, New York, NY 10005',
      points: 100,
      keyPiece: 'F'
    }),
    Task.create({
      name: 'Task 2',
      description: 'Not the Kitchen',
      latitude: 40.705254,
      longitude: -74.009076,
      address: '11 Hanover Square, New York, NY 10005',
      points: 200,
      keyPiece: 'S'
    }),
    Task.create({
      name: 'Queens 1',
      description: 'Corner near Sushi Island',
      latitude: 40.735026,
      longitude: -73.875643,
      address: '10 Hanover Square, New York, NY 10005',
      points: 100
    }),
    Task.create({
      name: 'Queens 2',
      description: 'near 56th St',
      latitude: 40.734611,
      longitude: -73.874956,
      address: '11 Hanover Square, New York, NY 10005',
      points: 200
    }),
    Task.create({
      name: 'Queens 3',
      description: 'near 57th St',
      latitude: 40.7343156,
      longitude: -73.8752318,
      address: '11 Hanover Square, New York, NY 10005',
      points: 200
    }),
    Task.create({
      name: 'Task 3',
      description: 'Exchange & Hanover',
      latitude: 40.705577,
      longitude: -74.009083,
      address: '3 Hanover Square, New York, NY 10005',
      points: 400,
      keyPiece: 'T'
    }),
    Task.create({
      name: 'Task 3',
      description: 'Bingo Deli',
      latitude: 40.703944,
      longitude: -74.010442,
      address: '95 Pearl St, New York, NY 10005',
      points: 400,
      keyPiece: 'K'
    })
  ])

  console.log(`seeded ${tasks.length} tasks`)

  const events = await Promise.all([
    Event.create({
      name: 'Financial Icons',
      description: 'Find the icons that best represent the Financial District',
      isActive: true,
      duration: 3600,
      location: 'Financial District, NY',
      latitude: 40.7076124,
      longitude: -74.009378,
      latitudeDelta: 0.0148204,
	  longitudeDelta: 0.017598,
	  masterRiddle: 'When you buy buy buy',
      masterKey: 'bull market'
    }),
    Event.create({
      name: 'American Life',
      description:
        'What makes up American Life today? This hunt with show you the foundations of daily life in America',
      isActive: false,
      location: 'Manhattan, NY',
      latitude: 40.7900869,
      longitude: -73.9598295,
      latitudeDelta: 0.178114,
      longitudeDelta: 0.109254
    }),
    Event.create({
      name: 'FSA Test Event',
      description:
        'The best place to test this app is right here in Fullstack Academy',
        isActive: true,
        location: '5 Hanover Square, New York, NY',
        latitude: 40.7049444,
        longitude: -74.0091771,
        latitudeDelta: 0.0148204,
        longitudeDelta: 0.017598,
        masterKey: 'fullstack'
    }),
    Event.create({
      name: 'Queens Home Test Event',
      description:
        'Queens Place Mall test',
      isActive: true,
      location: '8801 Queens Blvd, Queens, NY',
      latitude: 40.7355974,
      longitude: -73.8767265,
      latitudeDelta: 0.0148204,
      longitudeDelta: 0.017598
    })
  ])

  await events[0].addTasks([tasks[0], tasks[1], tasks[2]])
  await events[1].addTasks([tasks[3], tasks[4], tasks[5]])
  await events[2].addTasks([tasks[6], tasks[7], tasks[11], tasks[12]]);
  await events[3].addTasks([tasks[8], tasks[9], tasks[10]])


  console.log(`seeded ${events.length} events`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
