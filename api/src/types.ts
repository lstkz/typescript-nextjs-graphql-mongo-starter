import { UserModel } from './collections/User';
import { Resolvers as BaseResolvers } from './generated';

export type AppContext = {
  getUser: () => UserModel;
  getUserOrAnonymous: () => UserModel | null;
};

export type Resolvers = BaseResolvers<AppContext>;
