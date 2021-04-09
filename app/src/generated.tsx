import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Void: any;
};

export type AuthResult = {
  __typename?: 'AuthResult';
  token: Scalars['String'];
  user?: Maybe<User>;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['String'];
  content: Scalars['String'];
  author: Scalars['String'];
};

export type MessageInput = {
  content?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<AuthResult>;
  register?: Maybe<AuthResult>;
};

export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type MutationRegisterArgs = {
  values: RegisterInput;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  ping: Scalars['Float'];
};

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type TodoMvc = {
  __typename?: 'TodoMVC';
  todoId: Scalars['ID'];
  completed: Scalars['Boolean'];
  description: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
};

export type AppDataQueryVariables = Exact<{ [key: string]: never }>;

export type AppDataQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & AllUserPropsFragment;
};

export type AllUserPropsFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'username'
>;

export const AllUserPropsFragmentDoc = gql`
  fragment allUserProps on User {
    id
    username
  }
`;
export const AppDataDocument = gql`
  query AppData {
    me {
      ...allUserProps
    }
  }
  ${AllUserPropsFragmentDoc}
`;

/**
 * __useAppDataQuery__
 *
 * To run a query within a React component, call `useAppDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useAppDataQuery(
  baseOptions?: Apollo.QueryHookOptions<AppDataQuery, AppDataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AppDataQuery, AppDataQueryVariables>(
    AppDataDocument,
    options
  );
}
export function useAppDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AppDataQuery, AppDataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AppDataQuery, AppDataQueryVariables>(
    AppDataDocument,
    options
  );
}
export type AppDataQueryHookResult = ReturnType<typeof useAppDataQuery>;
export type AppDataLazyQueryHookResult = ReturnType<typeof useAppDataLazyQuery>;
export type AppDataQueryResult = Apollo.QueryResult<
  AppDataQuery,
  AppDataQueryVariables
>;
