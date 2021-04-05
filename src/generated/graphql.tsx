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
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: "Mutation";
  addNumber?: Maybe<Scalars["Int"]>;
};

export type MutationAddNumberArgs = {
  a?: Maybe<Scalars["Int"]>;
  b?: Maybe<Scalars["Int"]>;
};

export type Query = {
  __typename?: "Query";
  allTodos: Array<TodoMvc>;
  Todo?: Maybe<TodoMvc>;
};

export type QueryTodoArgs = {
  todoId: Scalars["ID"];
};

export type TodoMvc = {
  __typename?: "TodoMVC";
  todoId: Scalars["ID"];
  completed: Scalars["Boolean"];
  description: Scalars["String"];
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

export const GetAllTodosDocument = gql`
  query GetAllTodos {
    allTodos {
      todoId
      completed
      description
    }
  }
`;
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
export type AddTestMutationResult = Apollo.MutationResult<AddTestMutation>;
export type AddTestMutationOptions = Apollo.BaseMutationOptions<
  AddTestMutation,
  AddTestMutationVariables
>;
