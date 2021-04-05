import { mapUser } from '../common/mapper';
import { Resolvers } from '../types';

export const resolvers: Resolvers = {
  Mutation: {},
  Query: {
    me: (_, __, context) => {
      return mapUser(context.getUser());
    },
    ping: () => Date.now(),
  },
};
