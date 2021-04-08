import React from 'react';
import { useImmer, createModuleContext, useActions } from 'context-api';

interface Actions {
  test: () => void;
}

interface State {
  foo: boolean;
}

const [Provider, useContext] = createModuleContext<State, Actions>();

export interface AuthProps {
  children: React.ReactNode;
}

export function AuthModule(props: AuthProps) {
  const { children } = props;
  const [state, setState] = useImmer<State>(
    {
      foo: false,
    },
    'AuthModule'
  );
  const actions = useActions<Actions>({
    test: () => {},
  });

  return (
    <Provider state={state} actions={actions}>
      {children}
    </Provider>
  );
}

export function useAuthActions() {
  return useContext().actions;
}

export function useAuthState() {
  return useContext().state;
}
