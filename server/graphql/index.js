const { ApolloServer } = require('apollo-server-express');
const { merge } = require('lodash');
const {typeDef: User, resolvers: userResolvers} = require('./user');
const {typeDef: Team, resolvers: teamResolvers} = require('./team');
const {typeDef: Event, resolvers: eventResolvers} = require('./event');
const loaders = require('./dataLoaders');

const Query = `
  type Query {
    availableUsers: [User]!
    user(id: ID!): User
    events: [Event]!
    event(id: ID): Event
    teams: [Team]!
    team(id: ID!): Team
  }
`;

const Mutation = `
  type Mutation {
    createTeam(name: String!, userId: ID!): Team!
    addUserToTeam(teamId: ID!, userId: ID!): User!
  }
`;

const resolvers = merge({}, userResolvers, teamResolvers, eventResolvers);

const typeDefs = [Query, Mutation, User, Team, Event];
const schema = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => loaders(),
  playground: {
    endpoint: '/graphql',
    settings: {
      'editor.theme': 'light'
    }
  }
});

module.exports = schema;
