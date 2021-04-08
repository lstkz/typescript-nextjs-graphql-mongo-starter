import { UserModel } from '../collections/User';
import { User } from '../generated';

export function mapUser(user: UserModel): User {
  return {
    id: user._id.toHexString(),
    username: user.username,
  };
}
