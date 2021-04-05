import { TodoMvc } from '../generated/graphql';
import { Resolvers } from '../generated/resolvers';

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

export const resolvers: Resolvers = {
  Query: {
    allTodos: () => {
      if (Math.random() > 0.5) {
        throw new Error('Mock error');
      }
      return store;
    },
    Todo: (_: any, { todoId }) => store.find((d) => d.todoId === todoId),
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
