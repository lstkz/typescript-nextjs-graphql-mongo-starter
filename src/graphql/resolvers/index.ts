import deepMerge from 'deepmerge';
import { Resolvers, TodoMvc } from '../../generated';

const store: TodoMvc[] = [
  {
    todoId: '1',
    completed: false,
    description: 'foo',
  },
  {
    todoId: '2',
    completed: false,
    description: 'bar',
  },
];

const base: Resolvers = {
  Query: {
    allTodos: () => {
      if (Math.random() > 0.5) {
        throw new Error('Mock error');
      }
      return store;
    },
  },
  Mutation: {
    addNumber: async (_, { a, b }) => {
      if (Math.random() > 0.5) {
        throw new Error('Mock error');
      }
      return a + b;
    },
  },
};

export const resolvers: Resolvers = deepMerge(
  base,
  require('./auth').resolvers
);
