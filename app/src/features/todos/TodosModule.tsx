import React from 'react';
import { gql } from '@apollo/client';
import { InferGetServerSidePropsType } from 'next';
import { useImmer, createModuleContext, useActions } from 'context-api';
import {
  GetTodosDocument,
  GetTodosQuery,
  Todo,
  useTodoCreatedSubscription,
} from '../../generated';
import { getApolloClient } from '../../getApolloClient';
import { TodosPage } from './TodosPage';
import { createGetServerSideProps } from '../../common/helper';
import { useSubHandler } from '../../hooks/useSubHandler';

interface Actions {}

interface State {
  items: Todo[];
}

gql`
  subscription TodoCreated {
    todoCreated {
      id
      name
    }
  }
`;

const [Provider, useContext] = createModuleContext<State, Actions>();

export function TodosModule(props: TodosSSRProps) {
  const { allTodos } = props;
  const [state, setState, getState] = useImmer<State>(
    {
      items: allTodos,
    },
    'TodosModule'
  );
  useSubHandler(useTodoCreatedSubscription(), data => {
    setState(draft => {
      draft.items.push(data.todoCreated);
    });
  });
  console.log(123);
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
