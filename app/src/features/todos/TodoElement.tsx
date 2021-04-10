import { gql } from '@apollo/client';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import 'twin.macro';
import { Todo, useRemoveTodoMutation } from '../../generated';

interface TodoElementProps {
  item: Todo;
}

gql`
  mutation RemoveTodo($id: String!) {
    removeTodo(id: $id)
  }
`;

export function TodoElement(props: TodoElementProps) {
  const { item } = props;
  const [removeTodo] = useRemoveTodoMutation();
  return (
    <div
      key={item.id}
      tw="mt-4 p-4 px-6 border-gray-300 rounded-md border mb-2 flex"
    >
      <div>{item.name}</div>
      <button
        onClick={() => {
          void removeTodo({
            variables: { id: item.id },
          });
        }}
        tw="px-2 ml-auto cursor-pointer hover:text-red-500"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}
