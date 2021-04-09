import React from 'react';
import { gql } from '@apollo/client';
import { InferGetServerSidePropsType } from 'next';
import { useImmer, createModuleContext, useActions } from 'context-api';
import { GetTodosDocument, GetTodosQuery, Todo } from '../../generated';
import { getApolloClient } from '../../getApolloClient';
import { TodosPage } from './TodosPage';
import { createGetServerSideProps } from '../../common/helper';

interface Actions {}

interface State {
  items: Todo[];
}

const [Provider, useContext] = createModuleContext<State, Actions>();

export function TodosModule(props: TodosSSRProps) {
  const { allTodos } = props;
  const [state, setState, getState] = useImmer<State>(
    {
      items: allTodos,
    },
    'TodosModule'
  );
  const actions = useActions<Actions>({});

  return (
    <Provider state={state} actions={actions}>
      <TodosPage />
    </Provider>
  );
}

export function useTodosActions() {
  return useContext().actions;
}

export function useTodosState() {
  return useContext().state;
}

export type TodosSSRProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

gql`
  query GetTodos {
    allTodos {
      id
      name
    }
  }
`;

export const getServerSideProps = createGetServerSideProps(async ctx => {
  const client = getApolloClient(ctx);
  const ret = await client.query<GetTodosQuery>({
    query: GetTodosDocument,
  });
  return {
    props: ret.data,
  };
});
