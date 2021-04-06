import { ApolloServer } from 'apollo-server-micro';
import 'graphql-import-node';
import typeDefs from './schema.graphql';
import { resolvers } from './resolvers';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      user: null,
    };
  },
});

async function start(req: any, res: any) {
  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}

export default start;
