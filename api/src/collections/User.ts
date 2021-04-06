import { ObjectID } from 'mongodb';
import { safeExtend } from '../common/helper';
import { createCollection } from '../db';

export interface UserModel {
  _id: ObjectID;
  email: string;
  email_lowered: string;
  username: string;
  username_lowered: string;
  password: string;
}

export const UserCollection = safeExtend(
  createCollection<UserModel>('user', [
    {
      key: {
        email_lowered: 1,
      },
      unique: true,
    },
    {
      key: {
        username_lowered: 1,
      },
      unique: true,
    },
  ]),
  {
    findOneByEmail(email: string) {
      return UserCollection.findOne({ email_lowered: email.toLowerCase() });
    },
    findOneByUsername(username: string) {
      return UserCollection.findOne({
        username_lowered: username.toLowerCase(),
      });
    },
  }
);
