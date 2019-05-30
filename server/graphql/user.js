const { User, Team } = require('../db/models');

const USER_TYPE = `
  type User {
    id: ID!
    email: String!
    username: String!
    team: Team
  }
`;

const resolvers = {
  Query: {
    users: async (root, args, context, info) => {
      try {
        const users = await User.findAll();
        return users;
      } catch (error) {
        console.error('Unable to complete request to find all users');
      }
    },
    user: async (root, args, context, info) => {
      try {
        const id = parseInt(args.id, 10);
        const user = await User.findByPk(id);
        return user;
      } catch (error) {
        console.error('Unable to complete request to find user');
      }
    }
  },
  User: {
    team: async (root, args, context, info) => {
      try {
        if (!root.teamId) return null;

        const id = parseInt(root.teamId, 10);
        const team = await Team.findByPk(id);
        return team;
      } catch (error) {
        console.error('Unable to complete request to find team');
      }
    }
  }
}

module.exports = {
  typeDef: USER_TYPE,
  resolvers
}
