import React from 'react';
import 'twin.macro';
import { useTodosActions, useTodosState } from './TodosModule';
import { useAuthActions, useUser } from '../../components/AuthModule';
import { Button } from '../../components/Button';
import { AddTodoForm } from './AddTodoForm';
import { TodoElement } from './TodoElement';

export function TodosPage() {
  const user = useUser();
  const { logout } = useAuthActions();
  const {} = useTodosActions();
  const { items } = useTodosState();
  return (
    <div>
      <div tw="border-b border-gray-300 py-4">
        <div tw="container flex justify-end ">
          Hello, {user.username}{' '}
          <Button onClick={logout} tw="ml-2" type="primary" size="small">
            Logout
          </Button>
        </div>
      </div>
      <div className="container">
        <h1 className="text-4xl mt-4 text-center">Todo list</h1>
        <div tw="max-w-lg">
          <AddTodoForm />
          {items.map(item => (
            <TodoElement key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
