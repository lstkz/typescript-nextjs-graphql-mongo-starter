import { gql } from '@apollo/client';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
// import React from 'react';
// import {
//   GetAllTodosDocument,
//   GetAllTodosQuery,
//   TodoMvc,
// } from '../generated/graphql';
import { getApolloClient } from '../getApolloClient';
import {
  GetAllTodosDocument,
  GetAllTodosQuery,
  useAddTestMutation,
} from '../graphql.g';

gql`
  query GetAllTodos {
    allTodos {
      todoId
      completed
      description
    }
  }

  mutation addTest($a: Int!, $b: Int!) {
    addNumber(a: $a, b: $b)
  }
`;

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { allTodos } = props;
  const [addTest] = useAddTestMutation();

  return (
    <div>
      <button
        onClick={() => {
          addTest({
            variables: {
              a: 2,
              b: 2,
            },
          })
            .then((ret) => {
              console.log(ret.data.addNumber);
            })
            .catch((e) => {
              alert(e.message);
            });
        }}
      >
        click
      </button>
      {allTodos.map((todo) => (
        <div key={todo.todoId}>{todo.description}</div>
      ))}
    </div>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const client = getApolloClient(ctx);
  const ret = await client.query<GetAllTodosQuery>({
    query: GetAllTodosDocument,
  });
  return {
    props: ret.data,
  };
};
