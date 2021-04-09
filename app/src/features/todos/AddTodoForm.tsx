import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import 'twin.macro';
import { ContextInput } from '../../components/ContextInput';
import { gql } from '@apollo/client';
import { useAddTodoMutation } from '../../generated';
import { Button } from '../../components/Button';

interface AddTodoFormProps {}

const schema = z.object({
  name: z.string().nonempty({ message: 'Required' }),
});

gql`
  mutation AddTodo($name: String!) {
    addTodo(name: $name) {
      id
      name
    }
  }
`;

type FormValues = z.infer<typeof schema>;

export function AddTodoForm(props: AddTodoFormProps) {
  const {} = props;
  const formMethods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const [addTodo, { loading }] = useAddTodoMutation();
  const { handleSubmit } = formMethods;
  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(async values => {
          await addTodo({
            variables: values,
          });
          formMethods.reset();
        })}
      >
        <div tw="w-full flex items-start">
          <ContextInput placeholder="name" name="name" />
          <Button tw="ml-2" htmlType="submit" type="primary" loading={loading}>
            Add
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
