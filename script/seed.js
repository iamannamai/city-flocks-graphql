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
    // User.create({username: 'dio', email: 'dio@email.com', password: '123'}),
    // User.create({username: 'fuku', email: 'fuku@email.com', password: '123'}),
    User.create({username: 'tonystark22', email: 'metalman@scavengers.com', password: '123'}),
    User.create({username: 'steverogers_usa', email: 'cap@scavengers.com', password: '123'}),
    User.create({username: 'drbanner', email: 'hulk@scavengers.com', password: '123'}),
    User.create({username: 'th0r', email: 'thor@scavengers.com', password: '123'}),
    User.create({username: 'black_widow', email: 'natasha@scavengers.com', password: '123'}),
    User.create({username: 'pepperpotts', email: 'pepper@scavengers.com', password: '123'}),
    User.create({username: 'clintbarton', email: 'hawkeye@scavengers.com', password: '123'}),
    User.create({username: 'jamesrhodes', email: 'warmachine@scavengers.com', password: '123'}),
    User.create({username: 'tchalla', email: 'bpanther@scavengers.com', password: '123'}),
    User.create({username: 'peterparker', email: 'spidey@scavengers.com', password: '123'}),
    User.create({username: 'scottlang', email: 'slant@scavengers.com', password: '123'}),
  ])

  console.log(`seeded ${users.length} users`)

  const teams = await Promise.all([
    Team.create({name: 'Team 1'}),
	Team.create({name: 'Team 2'}),
	Team.create({name: 'ScAvengers'})
  ])

  await teams[0].addUsers([users[0], users[2], users[4]])
  await teams[1].addUsers([users[1], users[3], users[5]])
  await teams[2].addUsers([users[6], users[7], users[8], users[9], users[10], users[11]])

  console.log(`seeded ${teams.length} teams`)

  const tasks = await Promise.all([
    Task.create({
      name: 'Charging Bull',
      description: 'Grab the bull by the horns',
      latitude: 40.7055648,
      longitude: -74.0156334,
      address: 'New York, NY 10004',
      points: 600,
      keyPiece: 'LA'
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
      description: 'In the Kitchen',
      latitude: 40.705217,
      longitude: -74.009342,
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
    }),
    Task.create({
      name: 'Sanctum Sanctorum',
      description: 'A very strange place...',
      latitude: 40.729037,
      longitude: -74.000716,
      address: '177A Bleecker Street, New York, NY 10012',
      points: 800,
      keyPiece: 'SM'
    }),
    Task.create({
      name: 'Stark Tower',
      description: 'The tower of power',
      latitude: 40.755947,
      longitude: -73.985772,
      address: '4 Times Square, New York, NY 10036',
      points: 1200,
      keyPiece: 'E'
    }),
    Task.create({
      name: 'Park Ave near Grand Central',
      description: 'A grand place to defend against invasions',
      latitude: 40.751925,
      longitude: -73.977806,
      address: '120 Park Ave, New York, NY 10017',
      points: 400,
      keyPiece: 'B'
    }),
    Task.create({
      name: 'Bethesda Terrace, Central Park',
      description: 'An nice terrace in the park to tie things up',
      latitude: 40.773794,
      longitude: -73.970951,
      address: 'The Mall, New York, NY 10024',
      points: 500,
      keyPiece: 'S'
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
      name: 'Fuller Stack',
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
      name: 'Queens Get The Money',
      description:
        'Queens Boulevard represent, represent. A Tribe Called Quest represent, represent',
      isActive: true,
      location: '8801 Queens Blvd, Queens, NY',
      latitude: 40.7355974,
      longitude: -73.8767265,
      latitudeDelta: 0.0148204,
      longitudeDelta: 0.017598
    }),
    Event.create({
      name: 'Friend Game',
      description:
        'There was an idea to bring together a group of remarkable people. To make them work together when we needed them to, to fight the battles that we never could.',
      isActive: true,
      location: 'Manhattan, NY',
      latitude: 40.751925,
      longitude: -73.977806,
      latitudeDelta: 0.178114,
      longitudeDelta: 0.109254,
      masterRiddle: 'There was an idea to bring together a group of remarkable people, to see if we could become something more',
      masterKey: 'Assemble'
    })
  ])

  await events[0].addTasks([tasks[0], tasks[1], tasks[2]])
  await events[1].addTasks([tasks[3], tasks[4], tasks[5]])
  await events[2].addTasks([tasks[6], tasks[7], tasks[11], tasks[12]]);
  await events[3].addTasks([tasks[8], tasks[9], tasks[10]])
  await events[4].addTasks([tasks[0], tasks[13], tasks[14], tasks[15], tasks[16]])


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
