const redis = require('redis');
const client = process.env.REDIS_URL
  ? redis.createClient(process.env.REDIS_URL)
  : redis.createClient(6379, '127.0.0.1');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis);

client.on('connect', () => {
  console.log('redis connected!');
});

client.on('error', err => {
  console.error(`Error: ${err}`);
});

/*
HKEYS - returns all field names in hash stored at key
HVALS - returns all values in the hash stored at key
*/

const getSetMembersAsync = (eventTeamId) => client.smembersAsync(`eventTeam:${eventTeamId}:players`);

const addToEventTeamSetAsync = (eventTeamId, username) => client.saddAsync(`eventTeam:${eventTeamId}:players`, username);

const deletePlayerFromEventTeamHashAsync = (eventTeamId, username) => client.hdelAsync(`eventTeam:${eventTeamId}:player-location`, username);

const setAndGetPlayerHash = (eventTeamId, username, geoIdentifier) => {
  return client
    .multi()
    .hset(`eventTeam:${eventTeamId}:player-location`, username, geoIdentifier)
    .smembers(`eventTeam:${eventTeamId}:players`)
    .hvals(`eventTeam:${eventTeamId}:player-location`)
    .execAsync()
};

module.exports = {
  client,
  addToEventTeamSetAsync,
  getSetMembersAsync,
  deletePlayerFromEventTeamHashAsync,
  setAndGetPlayerHash
};
