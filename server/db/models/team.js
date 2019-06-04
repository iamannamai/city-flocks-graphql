const Sequelize = require('sequelize');
const {Op} = Sequelize;
const db = require('../db');

const Team = db.define('team', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
});

Team.findSelectedTeams = function(teamIds) {
  return Team.findAll({
    where: {
      id: {
        [Op.in]: teamIds
      }
    }
  });
};

module.exports = Team;
