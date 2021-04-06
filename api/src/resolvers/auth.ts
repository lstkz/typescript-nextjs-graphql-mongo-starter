import { ValidationError } from 'apollo-server-errors';

type Resolvers = any;

export const resolvers: Resolvers = {
  Mutation: {
    login: (_, { password, username }) => {
      throw new ValidationError('todo');
    },
  },
};
