import { ValidationError } from 'apollo-server-errors';
import { Resolvers } from '../../generated';

export const resolvers: Resolvers = {
  Mutation: {
    login: (_, { password, username }) => {
      throw new ValidationError('todo');
    },
  },
};
