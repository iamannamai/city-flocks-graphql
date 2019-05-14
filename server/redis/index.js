const redis = require('redis');
const client = redis.createClient();

client.on('connect', () => {
  console.log('redis connected!');
});

client.on('error', err => {
  console.error(`Error: ${err}`);
});

/*
HKEYS - returns all field names in hash stored at key
HVALS - returns all values in the hash stored at key
HDEL - removes fields from hash stored at key
*/

module.exports = client;
