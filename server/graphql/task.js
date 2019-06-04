const { Task } = require('../db/models');

const TASK_TYPE = `
  type Task {
    id: ID!
    description: String!
    latitude: Float!
    longitude: Float!
    address: String
    points: Int!
    keyPiece: String!
    event: Event
  }
`;

const resolvers = {
  Query: {
    tasks: async (root, args, context, info) => {

    },
    task: async(root, args, context, info) => {

    }
  },
  Task: {

  }
}

module.exports = {
  typeDef: TASK_TYPE,
  resolvers
}
