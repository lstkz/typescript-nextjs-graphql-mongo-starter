import { ObjectID } from 'mongodb';
import { createCollection } from '../db';

export interface TodoModel {
  _id: ObjectID;
  userId: ObjectID;
  name: string;
}

export const TodoCollection = createCollection<TodoModel>('todo');
