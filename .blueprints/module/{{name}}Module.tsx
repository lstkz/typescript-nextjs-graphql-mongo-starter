import React from 'react';
import { useImmer } from 'use-immer';

interface Actions {
  show: () => void;
  hide: () => void;
}
 
interface State {
  isOpen: boolean; 
}

const {{name}}Context = React.createContext<{
  state: State;
  actions: Actions;
}>(null!);

export interface  {{name}}Props {
  children: React.ReactNode;
}

export function {{name}}Module(props: {{name}}Props) {
  const { children } = props;
  const [state, setState] = useImmer<State>({ isOpen: false });
  const actions = React.useMemo<Actions>(
    () => ({
      hide: () =>
        setState(draft => {
          draft.isOpen = false;
        }),

      show: () => {
        setState(draft => {
          draft.isOpen = true;
        });
      },
    }),
    []
  );


  return ( 
      <{{name}}Context.Provider
        value=\{{
          state,
          actions,
        }}
      >
        {children}
      </{{name}}Context.Provider>
  );
}

function useContext() {
  const context = React.useContext({{name}}Context);
  if (!context) {
    throw new Error('{{name}}Context is not set');
  }
  return context;
}

export function use{{name}}Actions() {
  return useContext().actions;
}
