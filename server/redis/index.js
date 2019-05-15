const redis = require('redis');
const client = process.env.REDIS_URL
  ? redis.createClient(process.env.REDIS_URL)
  : redis.createClient(6379, '127.0.0.1');
const { promisify } = require('util');
const smembersAsync = promisify(client.smembers).bind(client);
const saddAsync = promisify(client.sadd).bind(client);
const hsetAsync = promisify(client.hset).bind(client);
const hdelAsync = promisify(client.hdel).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);
const hvalsAsync = promisify(client.hvals).bind(client);

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

const getSetMembersAsync = (eventTeamId) => smembersAsync(`eventTeam:${eventTeamId}:players`);

const addToEventTeamSetAsync = (eventTeamId, username) => saddAsync(`eventTeam:${eventTeamId}:players`, username);

const addPlayerToEventTeamHashAsync = (eventTeamId, username, geoIdentifier) => hsetAsync(`eventTeam:${eventTeamId}:player-location`, username, geoIdentifier);

const getEventTeamHashValsAsync = eventTeamId => hvalsAsync(`eventTeam:${eventTeamId}:player-location`);

const getEventTeamHashAsync = eventTeamId => hgetallAsync(`eventTeam:${eventTeamId}:player-location`);

const deletePlayerFromEventTeamHashAsync = (eventTeamId, username) => hdelAsync(`eventTeam:${eventTeamId}:player-location`, username);

module.exports = {
  client,
  addToEventTeamSetAsync,
  getSetMembersAsync,
  addPlayerToEventTeamHashAsync,
  getEventTeamHashValsAsync,
  getEventTeamHashAsync,
  deletePlayerFromEventTeamHashAsync
};
