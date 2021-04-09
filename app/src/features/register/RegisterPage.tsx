import * as R from 'remeda';
import React from 'react';
import { gql } from '@apollo/client';
import { useImmer } from 'context-api';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRegisterMutation } from '../../generated';
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

interface FormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const schema = z
  .object({
    email: z.string().nonempty({ message: 'Required' }).email(),
    username: z.string().nonempty({ message: 'Required' }),
    password: z
      .string()
      .nonempty({ message: 'Required' })
      .min(5, 'Min 5 characters'),
    confirmPassword: z.string().nonempty({ message: 'Required' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

gql`
  mutation Register($registerValues: RegisterInput!) {
    register(values: $registerValues) {
      ...DefaultAuthResult
    }
  }
  fragment DefaultAuthResult on AuthResult {
    token
    user {
      ...allUserProps
    }
  }
`;

export function RegisterPage() {
  const [state, setState] = useImmer<State>(
    {
      error: '',
    },
    'RegisterModule'
  );
  const { error } = state;
  const formMethods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = formMethods;
  const [register, { loading }] = useRegisterMutation();
  const { loginUser } = useAuthActions();
  return (
    <FormPage title="Register">
      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit(async values => {
            setState(draft => {
              draft.error = '';
            });
            try {
              const ret = await register({
                variables: {
                  registerValues: R.omit(values, ['confirmPassword']),
                },
              });
              loginUser(ret.data!.register!);
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
            <ContextInput label="Email" name="email" />
            <ContextInput label="Password" name="password" type="password" />
            <ContextInput
              label="Confirm password"
              name="confirmPassword"
              type="password"
            />
          </div>
          <Button
            loading={loading}
            block
            type="primary"
            htmlType="submit"
            tw="mt-4"
          >
            Register
          </Button>
          <div className="text-center mt-6 text-sm">
            Already registered? Log in <Link href="/login">here</Link>.
          </div>
        </form>
      </FormProvider>
    </FormPage>
  );
}
