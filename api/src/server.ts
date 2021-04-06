import { ApolloServer } from 'apollo-server-micro';
import 'graphql-import-node';
import typeDefs from './schema.graphql';
import { resolvers } from './resolvers';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

async function start(req: any, res: any) {
  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}

export default start;
