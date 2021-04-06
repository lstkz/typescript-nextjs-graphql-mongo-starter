import path from 'path';
import { initDb } from 'mongodb2';

export const { createCollection, connect, withTransaction } = initDb({
  collections: () => [
    require('./collections/AccessToken'),
    require('./collections/User'),
    // APPEND
  ],
  uri: process.env.MONGODB_URI ?? 'mongodb://localhost:27017',
  dbName: process.env.MONGODB_DB_NAME ?? 'app',
});
