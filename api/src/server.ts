import { ApolloServer } from 'apollo-server-micro';
import 'graphql-import-node';
import util from 'util';
import typeDefs from './schema.graphql';
import { resolvers } from './resolvers';
import { connect } from './db';

const myPlugin = {
  // Fires whenever a GraphQL request is received from a client.
  requestDidStart(requestContext) {
    console.log('Request started! Query:\n' + requestContext.request.query);

    return {
      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      parsingDidStart(requestContext) {
        console.log('Parsing started!');
      },

      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      validationDidStart(requestContext) {
        console.log('Validation started!');
      },
    };
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      user: null,
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

async function start(req: any, res: any) {
  await init();
  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}

export default start;
