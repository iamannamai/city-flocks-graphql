const { Users } = require('./db/models');

const typeDef = `
  type User {
    id: ID!
    email: String!
    username: String!
    team: Team!
  }
`;

module.exports = {

}
