import React from 'react';
import { useImmer, createModuleContext, useActions } from 'context-api';
import { User } from '../generated';

interface Actions {
  logout: () => void;
}

interface State {
  user: User | null;
}

const [Provider, useContext] = createModuleContext<State, Actions>();

export interface AuthProps {
  children: React.ReactNode;
  initialUser: User | null;
}

export function AuthModule(props: AuthProps) {
  const { children, initialUser } = props;
  const [state, setState] = useImmer<State>(
    {
      user: initialUser,
    },
    'AuthModule'
  );
  const actions = useActions<Actions>({
    logout: () => {},
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
export function useUser() {
  return useAuthState().user;
}
