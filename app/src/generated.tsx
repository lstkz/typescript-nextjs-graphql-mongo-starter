import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
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
  __typename?: "AuthResult";
  token: Scalars["String"];
  user?: Maybe<User>;
};

export type Message = {
  __typename?: "Message";
  id: Scalars["String"];
  content: Scalars["String"];
  author: Scalars["String"];
};

export type MessageInput = {
  content?: Maybe<Scalars["String"]>;
  author?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  addNumber?: Maybe<Scalars["Int"]>;
  createMessage?: Maybe<Scalars["Void"]>;
  createMessage2?: Maybe<Message>;
  login?: Maybe<AuthResult>;
};

export type MutationAddNumberArgs = {
  a?: Maybe<Scalars["Int"]>;
  b?: Maybe<Scalars["Int"]>;
};

export type MutationCreateMessageArgs = {
  data?: Maybe<MessageInput>;
};

export type MutationCreateMessage2Args = {
  data?: Maybe<MessageInput>;
};

export type MutationLoginArgs = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  allTodos: Array<TodoMvc>;
  Todo?: Maybe<TodoMvc>;
};

export type QueryTodoArgs = {
  todoId: Scalars["ID"];
};

export type RegisterInput = {
  username: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type TodoMvc = {
  __typename?: "TodoMVC";
  todoId: Scalars["ID"];
  completed: Scalars["Boolean"];
  description: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["String"];
  username: Scalars["String"];
};

export type GetAllTodosQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllTodosQuery = { __typename?: "Query" } & {
  allTodos: Array<
    { __typename?: "TodoMVC" } & Pick<
      TodoMvc,
      "todoId" | "completed" | "description"
    >
  >;
};

export type AddTestMutationVariables = Exact<{
  a: Scalars["Int"];
  b: Scalars["Int"];
}>;

export type AddTestMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "addNumber"
>;

export type CreateMessageMutationVariables = Exact<{
  data: MessageInput;
}>;

export type CreateMessageMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "createMessage"
>;

export type CreateMessage2MutationVariables = Exact<{
  data: MessageInput;
}>;

export type CreateMessage2Mutation = { __typename?: "Mutation" } & {
  createMessage2?: Maybe<
    { __typename?: "Message" } & Pick<Message, "id" | "content" | "author">
  >;
};

export type DefaultAuthResultFragment = { __typename?: "AuthResult" } & Pick<
  AuthResult,
  "token"
> & { user?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "username">> };

export type LoginMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login?: Maybe<{ __typename?: "AuthResult" } & DefaultAuthResultFragment>;
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
export const AddTestDocument = gql`
  mutation addTest($a: Int!, $b: Int!) {
    addNumber(a: $a, b: $b)
  }
`;
export type AddTestMutationFn = Apollo.MutationFunction<
  AddTestMutation,
  AddTestMutationVariables
>;

/**
 * __useAddTestMutation__
 *
 * To run a mutation, you first call `useAddTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTestMutation, { data, loading, error }] = useAddTestMutation({
 *   variables: {
 *      a: // value for 'a'
 *      b: // value for 'b'
 *   },
 * });
 */
export function useAddTestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddTestMutation,
    AddTestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddTestMutation, AddTestMutationVariables>(
    AddTestDocument,
    options
  );
}
export type AddTestMutationHookResult = ReturnType<typeof useAddTestMutation>;
export type AddTestMutationResult = Apollo.MutationResult<AddTestMutation>;
export type AddTestMutationOptions = Apollo.BaseMutationOptions<
  AddTestMutation,
  AddTestMutationVariables
>;
export const CreateMessageDocument = gql`
  mutation createMessage($data: MessageInput!) {
    createMessage(data: $data)
  }
`;
export type CreateMessageMutationFn = Apollo.MutationFunction<
  CreateMessageMutation,
  CreateMessageMutationVariables
>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >(CreateMessageDocument, options);
}
export type CreateMessageMutationHookResult = ReturnType<
  typeof useCreateMessageMutation
>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<
  CreateMessageMutation,
  CreateMessageMutationVariables
>;
export const CreateMessage2Document = gql`
  mutation createMessage2($data: MessageInput!) {
    createMessage2(data: $data) {
      id
      content
      author
    }
  }
`;
export type CreateMessage2MutationFn = Apollo.MutationFunction<
  CreateMessage2Mutation,
  CreateMessage2MutationVariables
>;

/**
 * __useCreateMessage2Mutation__
 *
 * To run a mutation, you first call `useCreateMessage2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessage2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessage2Mutation, { data, loading, error }] = useCreateMessage2Mutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateMessage2Mutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateMessage2Mutation,
    CreateMessage2MutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateMessage2Mutation,
    CreateMessage2MutationVariables
  >(CreateMessage2Document, options);
}
export type CreateMessage2MutationHookResult = ReturnType<
  typeof useCreateMessage2Mutation
>;
export type CreateMessage2MutationResult = Apollo.MutationResult<CreateMessage2Mutation>;
export type CreateMessage2MutationOptions = Apollo.BaseMutationOptions<
  CreateMessage2Mutation,
  CreateMessage2MutationVariables
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
