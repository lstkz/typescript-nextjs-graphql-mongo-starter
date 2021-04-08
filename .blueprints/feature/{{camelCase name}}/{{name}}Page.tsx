import React from 'react';
import {
  use{{name}}Actions,
  use{{name}}State
} from './{{name}}Module';
import { useImmer } from 'context-api';

type State = {}

export function {{name}}Page() {
  const [state, setState, getState] = useImmer<State>(
    {
      foo: false 
    },
    '{{name}}Module'
  );
  const { } = use{{name}}Actions();
  const {} = use{{name}}State();
  return <div></div>
}
