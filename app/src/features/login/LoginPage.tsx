import React from 'react';
import { gql } from '@apollo/client';
import { useImmer } from 'context-api';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLoginMutation } from '../../generated';
import { ContextInput } from '../../components/ContextInput';
import tw from 'twin.macro';
import { Button } from '../../components/Button';
import { FormPage } from '../../components/FormPage';
import { Alert } from '../../components/Alert';
import { useAuthActions } from '../../components/AuthModule';
import Link from 'next/link';

type State = {
  error: string;
};

type FormValues = z.infer<typeof schema>;

const schema = z.object({
  username: z.string().nonempty({ message: 'Required' }),
  password: z.string().nonempty({ message: 'Required' }),
});

gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...DefaultAuthResult
    }
  }
`;

export function LoginPage() {
  const [state, setState] = useImmer<State>(
    {
      error: '',
    },
    'LoginModule'
  );
  const { error } = state;
  const formMethods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = formMethods;
  const [login, { loading }] = useLoginMutation();
  const { loginUser } = useAuthActions();
  return (
    <FormPage title="Login">
      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit(async values => {
            setState(draft => {
              draft.error = '';
            });
            try {
              const ret = await login({
                variables: values,
              });
              loginUser(ret.data!.login!);
            } catch (e) {
              setState(draft => {
                draft.error = e.message;
              });
            }
          })}
        >
          <div css={tw`grid gap-4 mt-10`}>
            {error && <Alert>{error}</Alert>}
            <ContextInput label="Username" name="username" />
            <ContextInput label="Password" name="password" type="password" />
          </div>
          <Button
            loading={loading}
            block
            type="primary"
            htmlType="submit"
            tw="mt-4"
          >
            Login
          </Button>
          <div className="text-center mt-6 text-sm">
            Not registered? Register <Link href="/register">here</Link>.
          </div>
        </form>
      </FormProvider>
    </FormPage>
  );
}
