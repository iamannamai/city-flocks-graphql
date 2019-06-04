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
        const users = await User.findAll({
          attributes: ['id', 'email', 'username', 'teamId']
        });
        return users;
      } catch (error) {
        console.error('Unable to complete request to find all users');
      }
    },
    user: async (root, args, context, info) => {
      try {
        const id = parseInt(args.id, 10);
        const user = await User.findByPk(id, {
          attributes: ['id', 'email', 'username', 'teamId']
        });
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
        const { teamLoader } = context;
        const team = await teamLoader.load(id);
        return team;
      } catch (error) {
        console.error('Unable to complete request to find team:', error);
      }
    }
  }
}

module.exports = {
  typeDef: USER_TYPE,
  resolvers
}
