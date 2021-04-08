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
  typeDefs,
  resolvers,
  context: async ({ req }: { req: MicroRequest }): Promise<AppContext> => {
    const token = req.headers['authorization'];
    let user: UserModel = null;
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
  await connect();
  isInited = true;
}

async function start(req: MicroRequest, res: ServerResponse) {
  await init();
  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}

export default start;
