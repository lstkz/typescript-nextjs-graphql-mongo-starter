import { ApolloServer, AuthenticationError } from 'apollo-server-micro';
import 'graphql-import-node';
import util from 'util';
import typeDefs from './schema.graphql';
import { resolvers } from './resolvers';
import { connect } from './db';
import { AppContext } from './types';
import { UserCollection, UserModel } from './collections/User';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { ServerResponse } from 'http';
import { AccessTokenCollection } from './collections/AccessToken';

const apolloServer = new ApolloServer({
  subscriptions: {
    path: '/subscriptions',
    onConnect: (connectionParams, webSocket, context) => {
      console.log('Connected!', { connectionParams, context });
      return connectionParams;
    },
    onDisconnect: (webSocket, context) => {
      console.log('Disconnected!');
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
    if (connection) {
      console.log('create context', connection);
    }
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
      user,
      ensureLoggedIn: () => {
        if (!user) {
          throw new AuthenticationError('Access token required');
        }
      },
    };
  },
  formatError: err => {
    console.error(util.inspect(err, { depth: 10 }));
    throw err;
  },
});

let isInited = false;
async function init() {
  if (isInited) {
    return;
  }
  isInited = true;
  await connect();
}

async function start(req: any, res: any, next: any) {
  await init();

  if (!res.socket.server.apolloServer) {
    apolloServer.installSubscriptionHandlers(res.socket.server);
    const handler = apolloServer.createHandler({ path: '/api/graphql' });
    res.socket.server.apolloServer = handler;
  }

  return res.socket.server.apolloServer(req, res, next);
}

export default start;
