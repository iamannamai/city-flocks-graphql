const {Team, User} = require('../db/models');

const TEAM_TYPE = `
  type Team {
    id: ID!
    name: String!
    users: [User]
  }
`;

const resolvers = {
  Query: {
    team: async (root, args, context, info) => {
      try {
        const id = parseInt(args.id, 10);
        const {teamLoader} = context;
        const team = await teamLoader.load(id);
        return team;
      } catch (error) {
        console.error('Unable to complete request to find team');
      }
    }
  },
  Team: {
    users: async (root, args, context, info) => {
      try {
        const teamId = parseInt(root.id, 10);
        const users = await User.findAll({
          where: {teamId},
          attributes: ['id', 'email', 'username', 'teamId']
        });
        return users;
      } catch (error) {
        console.error('Unable to complete request to find users on teams');
      }
    }
  },
  Mutation: {
    createTeam: async (root, args, context, info) => {
      try {
        const {name, userId} = args;
        const [team, user] = await Promise.all([
          Team.create({name}),
          User.findOne({where: {id: userId}})
        ]);
        team.addUser(user);
        console.log(team);
        return team;
      } catch (error) {
        console.error('Unable to complete request to create team');
      }
    }
  }
};

module.exports = {
  typeDef: TEAM_TYPE,
  resolvers
};
