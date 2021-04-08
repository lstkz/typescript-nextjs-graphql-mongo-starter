import React from 'react';
import { gql } from '@apollo/client';
import { InferGetServerSidePropsType } from 'next';
import { useImmer } from 'context-api';
import { GetLoginDocument, GetLoginQuery } from '../../generated';
import { getApolloClient } from '../../getApolloClient';
import { createGetServerSideProps } from '../../common/helper';
import tw from 'twin.macro';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

type State = {
  foo: boolean;
};

export function LoginPage(props: LoginSSRProps) {
  const {} = props;
  const [state, setState, getState] = useImmer<State>(
    {
      foo: false,
    },
    'LoginModule'
  );
  return (
    <div tw="max-w-xl mx-auto mt-20">
      <div css={tw`border border-gray-300 rounded-md p-6 py-10`}>
        <h1 className="text-3xl text-center font-extrabold">Login</h1>
        <Input placeholder="login" tw="mt-10" />
        <Input placeholder="password" tw="mt-4" />
        <Button type="primary" tw="mt-4" block>
          Login
        </Button>
      </div>
    </div>
  );
}

export type LoginSSRProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

gql`
  query GetLogin {
    ping
  }
`;

export const getServerSideProps = createGetServerSideProps(async ctx => {
  const client = getApolloClient(ctx);
  const ret = await client.query<GetLoginQuery>({
    query: GetLoginDocument,
  });
  return {
    props: ret.data,
  };
});
