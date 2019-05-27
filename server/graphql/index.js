const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `

`;

const resolvers = {
  Query: {

  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;
