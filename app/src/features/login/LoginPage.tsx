import React from 'react';
import { useImmer } from 'context-api';
import tw from 'twin.macro';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

type State = {
  foo: number;
};

export function LoginPage() {
  const [state, setState, getState] = useImmer<State>(
    {
      foo: Date.now(),
    },
    'LoginModule'
  );
  return (
    <div tw="max-w-xl mx-auto mt-20">
      <div css={tw`border border-gray-300 rounded-md p-6 py-10`}>
        <h1 className="text-3xl text-center font-extrabold">Login</h1>
        <Input placeholder="login" tw="mt-10" />
        <Input type="password" placeholder="password" tw="mt-4" />
        <Button type="primary" tw="mt-4" block>
          Login
        </Button>
      </div>
    </div>
  );
}
