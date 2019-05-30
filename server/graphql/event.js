const { Events } = require('../db/models');

const EVENT_TYPE = `
  type Event {
    id: ID!
    name: String!
    description: String
  }
`;

const resolvers = {
  Query: {
    events: async (root, args, context, info) => {
      try {
        const events = await Events.findAll();
        return events;
      } catch (error) {
        console.error('Unable to complete request to find all events');
      }
    },
    event: async (root, args, context, info) => {
      try {
        const id = parseInt(args.id, 10);
        const event = await Event.findByPk(id);
        return event;
      } catch (error) {
        console.error('Unable to complete request to find event');
      }
    }
  }
};

module.exports = {
  typeDef: EVENT_TYPE,
  resolvers
};
