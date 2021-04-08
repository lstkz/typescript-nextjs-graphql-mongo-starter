import { UserModel } from './collections/User';
import { Resolvers as BaseResolvers } from './generated';

export type AppContext = {
  user: UserModel;
  ensureLoggedIn: () => void;
};

export type Resolvers = BaseResolvers<AppContext>;
