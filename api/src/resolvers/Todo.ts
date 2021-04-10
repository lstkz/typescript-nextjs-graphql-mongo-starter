import { UserInputError } from 'apollo-server-micro';
import { ObjectID } from 'bson';
import { TodoCollection, TodoModel } from '../collections/Todo';
import { UserModel } from '../collections/User';
import { mapTodo } from '../common/mapper';
import { publishEvent, pubsub } from '../pubsub';
import { Resolvers } from '../types';

function _getTodoCreatedKey(user: UserModel) {
  return 'TODO_CREATED:' + user._id;
}

function _getTodoRemovedKey(user: UserModel) {
  return 'TODO_REMOVED:' + user._id;
}

export const resolvers: Resolvers = {
  Mutation: {
    addTodo: async (_, { name }, context) => {
      const user = context.getUser();
      const todo: TodoModel = {
        _id: new ObjectID(),
        name,
        userId: user._id,
      };
      await TodoCollection.insertOne(todo);
      const mapped = mapTodo(todo);
      await publishEvent(_getTodoCreatedKey(user), {
        todoCreated: mapped,
      });
      return mapped;
    },
    removeTodo: async (_, params, context) => {
      const user = context.getUser();
      const id = ObjectID.createFromHexString(params.id);
      const todo = await TodoCollection.findById(id);
      if (!todo) {
        throw new UserInputError('Todo not found');
      }
      if (!todo.userId.equals(user._id)) {
        throw new UserInputError('You are not allowed to access this Todo');
      }

      await publishEvent(_getTodoRemovedKey(user), {
        todoRemoved: mapTodo(todo),
      });
      await TodoCollection.deleteById(id);
    },
  },
  Query: {
    allTodos: async (_, __, context) => {
      const user = context.getUser();
      const items = await TodoCollection.findAll({
        userId: user._id,
      });
      return items.map(mapTodo);
    },
  },
  Subscription: {
    todoCreated: {
      subscribe: (_, __, context) => {
        const user = context.getUser();
        return pubsub.asyncIterator(_getTodoCreatedKey(user));
      },
    },
    todoRemoved: {
      subscribe: (_, __, context) => {
        const user = context.getUser();
        return pubsub.asyncIterator(_getTodoRemovedKey(user));
      },
    },
  },
};
