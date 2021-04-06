import deepMerge from 'deepmerge';

type Resolvers = any;
type TodoMvc = any;

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
        throw new Error('Mock error2');
      }
      return store;
    },
  },
  Mutation: {},
};

export const resolvers: Resolvers = deepMerge(
  base,
  require('./auth').resolvers
);
