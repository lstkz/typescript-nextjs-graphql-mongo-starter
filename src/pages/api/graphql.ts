import { ApolloServer } from 'apollo-server-micro';
import 'graphql-import-node';
import typeDefs from '../../graphql/schema.graphql';
import { resolvers } from '../../graphql/resolvers';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

async function start(req: any, res: any) {
  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}

export default start;
