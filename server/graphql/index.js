const { ApolloServer } = require('apollo-server-express');
const { merge } = require('lodash');
const {typeDef: User, resolvers: userResolvers} = require('./user');
const {typeDef: Team, resolvers: teamResolvers} = require('./team');
const {typeDef: Event, resolvers: eventResolvers} = require('./event');
const loaders = require('./dataLoaders');

const Query = `
  type Query {
    users: [User]!
    user(id: ID!): User
    events: [Event]!
    event(id: ID): Event
    teams: [Team]!
    team(id: ID!): Team
  }
`;

const resolvers = merge({}, userResolvers, teamResolvers, eventResolvers);

const typeDefs = [Query, User, Team, Event];
const schema = new ApolloServer({
  typeDefs,
  resolvers,
  context: loaders,
  playground: {
    endpoint: '/graphql',
    settings: {
      'editor.theme': 'light'
    }
  }
});

module.exports = schema;
