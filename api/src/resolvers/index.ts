import deepMerge from 'deepmerge';
import { Resolvers } from '../generated';

export const resolvers: Resolvers = deepMerge.all([
  require('./auth').resolvers,
  require('./user').resolvers,
  require('./Todo').resolvers,
  // APPEND
]);
