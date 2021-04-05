import { ApolloServer, AuthenticationError } from 'apollo-server';
import 'graphql-import-node';
import util from 'util';
import typeDefs from './schema.graphql';
import { resolvers } from './resolvers';
import { connect } from './db';
import { AppContext } from './types';
import { UserCollection, UserModel } from './collections/User';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { AccessTokenCollection } from './collections/AccessToken';

const apolloServer = new ApolloServer({
  subscriptions: {
    path: '/subscriptions',
    onConnect: connectionParams => {
      return connectionParams;
    },
  },
  typeDefs,
  resolvers,
  context: async ({
    req,
    connection,
  }: {
    req: MicroRequest;
    connection: any;
  }): Promise<AppContext> => {
    const token = connection
      ? connection.context.authorization
      : req.headers['authorization'];
    let user: UserModel = null!;
    if (token) {
      const existing = await AccessTokenCollection.findById(token);
      if (!existing) {
        throw new AuthenticationError('Invalid access token');
      }
      user = await UserCollection.findByIdOrThrow(existing.userId);
    }
    return {
      getUser: () => {
        if (!user) {
          throw new AuthenticationError('Access token required');
        }
        return user;
      },
      getUserOrAnonymous: () => {
        return user;
      },
    };
  },
  formatError: err => {
    console.error(util.inspect(err, { depth: 10 }));
    throw err;
  },
});

async function start() {
  await connect();
  await apolloServer
    .listen({
      port: process.env.PORT ?? 4000,
    })
    .then(({ url }) => {
      console.log(`🚀  Server ready at ${url} in ${process.env.NODE_ENV} mode`);
    });
}

start().catch(e => {
  console.error(e);
  process.exit(1);
});
