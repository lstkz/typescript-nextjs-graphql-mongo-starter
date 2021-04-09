import { UserInputError } from 'apollo-server-micro';
import { ObjectID } from 'bson';
import { withFilter } from 'graphql-subscriptions';
import { TodoCollection, TodoModel } from '../collections/Todo';
import { pubsub } from '../pubsub';
import { AppContext, Resolvers } from '../types';

export const resolvers: Resolvers = {
  Mutation: {
    addTodo: async (_, { name }, context) => {
      context.ensureLoggedIn();
      const todo: TodoModel = {
        _id: new ObjectID(),
        name,
        userId: context.user._id,
      };
      await TodoCollection.insertOne(todo);
      const mapped = {
        id: todo._id.toHexString(),
        name: todo.name,
      };
      await pubsub.publish('TODO_CREATED', {
        todoCreated: mapped,
      });
      return mapped;
    },
    removeTodo: async (_, params, context) => {
      const id = ObjectID.createFromHexString(params.id);
      context.ensureLoggedIn();
      const todo = await TodoCollection.findById(id);
      if (!todo) {
        throw new UserInputError('Todo not found');
      }
      if (!todo.userId.equals(context.user._id)) {
        throw new UserInputError('You are not allowed to access this Todo');
      }
      await TodoCollection.deleteById(id);
    },
  },
  Query: {
    allTodos: async (_, __, context) => {
      context.ensureLoggedIn();
      const items = await TodoCollection.findAll({
        userId: context.user._id,
      });
      return items.map(item => ({
        id: item._id.toHexString(),
        name: item.name,
      }));
    },
  },
  Subscription: {
    todoCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['TODO_CREATED']),
        (payload, variables, context: AppContext) => {
          console.log({
            payload,
            variables,
            context,
          });
          return true;
        }
      ),
    },
  },
};
