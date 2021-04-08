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
  allTodos: Array<TodoMvc>;
  Todo?: Maybe<TodoMvc>;
  me: User;
};

export type QueryTodoArgs = {
  todoId: Scalars['ID'];
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

export type GetAllTodosQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllTodosQuery = { __typename?: 'Query' } & {
  allTodos: Array<
    { __typename?: 'TodoMVC' } & Pick<
      TodoMvc,
      'todoId' | 'completed' | 'description'
    >
  >;
};

export type DefaultAuthResultFragment = { __typename?: 'AuthResult' } & Pick<
  AuthResult,
  'token'
> & { user?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'username'>> };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
  login?: Maybe<{ __typename?: 'AuthResult' } & DefaultAuthResultFragment>;
};

export const DefaultAuthResultFragmentDoc = gql`
  fragment defaultAuthResult on AuthResult {
    token
    user {
      id
      username
    }
  }
`;
export const GetAllTodosDocument = gql`
  query GetAllTodos {
    allTodos {
      todoId
      completed
      description
    }
  }
`;

/**
 * __useGetAllTodosQuery__
 *
 * To run a query within a React component, call `useGetAllTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTodosQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllTodosQuery,
    GetAllTodosQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllTodosQuery, GetAllTodosQueryVariables>(
    GetAllTodosDocument,
    options
  );
}
export function useGetAllTodosLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllTodosQuery,
    GetAllTodosQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllTodosQuery, GetAllTodosQueryVariables>(
    GetAllTodosDocument,
    options
  );
}
export type GetAllTodosQueryHookResult = ReturnType<typeof useGetAllTodosQuery>;
export type GetAllTodosLazyQueryHookResult = ReturnType<
  typeof useGetAllTodosLazyQuery
>;
export type GetAllTodosQueryResult = Apollo.QueryResult<
  GetAllTodosQuery,
  GetAllTodosQueryVariables
>;
export const LoginDocument = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...defaultAuthResult
    }
  }
  ${DefaultAuthResultFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
