import React from 'react';
import { gql } from '@apollo/client';
import { InferGetServerSidePropsType } from 'next';
import { useImmer, createModuleContext, useActions } from 'context-api';
import {
  GetTodosDocument,
  GetTodosQuery,
  Todo,
  TodoCreatedDocument,
  TodoCreatedSubscription,
  TodoRemovedDocument,
  TodoRemovedSubscription,
} from '../../generated';
import { getApolloClient } from '../../getApolloClient';
import { TodosPage } from './TodosPage';
import { createGetServerSideProps } from '../../common/helper';
import { useSubscription } from '../../hooks/useSubscription';

interface Actions {}

interface State {
  items: Todo[];
}

gql`
  query GetTodos {
    allTodos {
      ...allTodoFields
    }
  }
  subscription TodoCreated {
    todoCreated {
      ...allTodoFields
    }
  }
  subscription TodoRemoved {
    todoRemoved {
      ...allTodoFields
    }
  }
  fragment allTodoFields on Todo {
    id
    userId
    name
  }
`;

const [Provider, useContext] = createModuleContext<State, Actions>();

export function TodosModule(props: TodosSSRProps) {
  const { allTodos } = props;
  const [state, setState] = useImmer<State>(
    {
      items: allTodos,
    },
    'TodosModule'
  );
  useSubscription<TodoCreatedSubscription>(TodoCreatedDocument, data => {
    setState(draft => {
      draft.items.push(data.todoCreated);
    });
  });
  useSubscription<TodoRemovedSubscription>(TodoRemovedDocument, data => {
    setState(draft => {
      draft.items = draft.items.filter(item => item.id !== data.todoRemoved.id);
    });
  });
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

export const getServerSideProps = createGetServerSideProps(async ctx => {
  const client = getApolloClient(ctx);
  const ret = await client.query<GetTodosQuery>({
    query: GetTodosDocument,
  });
  return {
    props: ret.data,
  };
});
