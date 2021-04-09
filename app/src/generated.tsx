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
  user: User;
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

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
  login?: Maybe<{ __typename?: 'AuthResult' } & DefaultAuthResultFragment>;
};

export type RegisterMutationVariables = Exact<{
  registerValues: RegisterInput;
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register?: Maybe<{ __typename?: 'AuthResult' } & DefaultAuthResultFragment>;
};

export type DefaultAuthResultFragment = { __typename?: 'AuthResult' } & Pick<
  AuthResult,
  'token'
> & { user: { __typename?: 'User' } & AllUserPropsFragment };

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
export const DefaultAuthResultFragmentDoc = gql`
  fragment DefaultAuthResult on AuthResult {
    token
    user {
      ...allUserProps
    }
  }
  ${AllUserPropsFragmentDoc}
`;
export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...DefaultAuthResult
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
export const RegisterDocument = gql`
  mutation Register($registerValues: RegisterInput!) {
    register(values: $registerValues) {
      ...DefaultAuthResult
    }
  }
  ${DefaultAuthResultFragmentDoc}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerValues: // value for 'registerValues'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
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
