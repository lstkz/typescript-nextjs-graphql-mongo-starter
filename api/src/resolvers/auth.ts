import { ObjectID } from 'mongodb';
import bcrypt from 'bcryptjs';
import { ValidationError } from 'apollo-server-errors';
import { UserCollection, UserModel } from '../collections/User';
import { AuthResult } from '../generated';
import { Resolvers } from '../types';
import { randomUniqString } from '../common/helper';
import {
  AccessTokenCollection,
  AccessTokenModel,
} from '../collections/AccessToken';
import { AuthenticationError } from 'apollo-server-micro';
import { mapUser } from '../common/mapper';

async function _createAuthData(user: UserModel): Promise<AuthResult> {
  const accessToken: AccessTokenModel = {
    _id: randomUniqString(),
    userId: user._id,
  };
  await AccessTokenCollection.insertOne(accessToken);
  return {
    token: accessToken._id,
    user: mapUser(user),
  };
}

export const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { password, username }) => {
      const existing = await UserCollection.findOneByUsername(username);
      if (!existing) {
        throw new AuthenticationError('Invalid credentials');
      }
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existing.password
      );
      if (!isPasswordCorrect) {
        throw new AuthenticationError('Invalid credentials');
      }
      return _createAuthData(existing);
    },
    register: async (_, { values }) => {
      if (values.password.length < 5) {
        throw new ValidationError('Password must have min 5 characters');
      }
      if (await UserCollection.findOneByEmail(values.email)) {
        throw new ValidationError('Email already registered');
      }
      if (await UserCollection.findOneByUsername(values.username)) {
        throw new ValidationError('Username already taken');
      }
      const user: UserModel = {
        _id: new ObjectID(),
        email: values.email,
        email_lowered: values.email.toLowerCase(),
        username: values.username,
        username_lowered: values.username.toLowerCase(),
        password: await bcrypt.hash(values.password, await bcrypt.genSalt()),
      };
      await UserCollection.insertOne(user);
      return _createAuthData(user);
    },
  },
};
