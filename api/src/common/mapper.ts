import { TodoModel } from '../collections/Todo';
import { UserModel } from '../collections/User';
import { Todo, User } from '../generated';

export function mapUser(user: UserModel): User {
  return {
    id: user._id.toHexString(),
    username: user.username,
  };
}

export function mapTodo(item: TodoModel): Todo {
  return {
    id: item._id.toHexString(),
    userId: item.userId.toHexString(),
    name: item.name,
  };
}
