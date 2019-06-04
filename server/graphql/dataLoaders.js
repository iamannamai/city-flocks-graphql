const DataLoader = require('dataloader');
const {User, Team, Event} = require('../db/models');

const batchLoadUsers = userIds =>
  User.findSelectedUsers(userIds)
    .then(users => {
      const userDict = users.reduce((dict, current) => {
        dict[current.id] = current;
        return dict;
      }, {});
      return userIds.map(id => userDict[id]);
    });

const batchLoadTeams = teamIds =>
  Team.findSelectedTeams(teamIds)
    .then(teams => {
      console.log('fetched teams from db');
      const teamDict = teams.reduce((dict, current) => {
        dict[current.id] = current;
        return dict;
      }, {});
      return teamIds.map(id => teamDict[id]);
    });

module.exports = () => ({
  userLoader: new DataLoader(keys => batchLoadUsers(keys)),
  teamLoader: new DataLoader(keys => batchLoadTeams(keys)),
});
