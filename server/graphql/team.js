const { Team } = require('../db/models');

const TEAM_TYPE = `
  type Team {
    id: ID!
    name: String!
  }
`;

const resolvers = {
  Query: {
    teams: async (root, args, context, info) => {
      try {
        const teams = await Team.findAll();
        return teams;
      } catch (error) {
        console.error('Unable to complete request to find all teams');
      }
    }
  }
};

module.exports = {
  typeDef: TEAM_TYPE,
  resolvers
}
