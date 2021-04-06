import path from 'path';
import { initDb } from 'mongodb2';

export const { createCollection, connect, withTransaction } = initDb({
  // baseDirectory: path.join(__dirname, 'collections'),
  collections: () => [
    require('./collections/AccessToken'),
    require('./collections/User'),
  ],
  // baseDirectory:
  //   '/Users/sky/work/typescript-nextjs-graphql-mongo-starter/api/src/collections',
  uri: process.env.MONGODB_URI ?? 'mongodb://localhost:27017',
  dbName: process.env.MONGODB_DB_NAME ?? 'app',
});
