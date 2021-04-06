import { gql } from '@apollo/client';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import {
  GetAllTodosDocument,
  GetAllTodosQuery,
  useAddTestMutation,
  useCreateMessageMutation,
  useLoginMutation,
} from '../generated';
import { getApolloClient } from '../getApolloClient';

gql`
  query GetAllTodos {
    allTodos {
      todoId
      completed
      description
    }
  }

  # mutation addTest($a: Int!, $b: Int!) {
  #   addNumber(a: $a, b: $b)
  # }

  # mutation createMessage($data: MessageInput!) {
  #   createMessage(data: $data)
  # }

  # mutation createMessage2($data: MessageInput!) {
  #   createMessage2(data: $data) {
  #     id
  #     content
  #     author
  #   }
  # }

  fragment defaultAuthResult on AuthResult {
    token
    user {
      id
      username
    }
  }

  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...defaultAuthResult
    }
  }
`;

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { allTodos } = props;
  const [addTest] = useAddTestMutation();
  const [createMessage] = useCreateMessageMutation();
  // createMessage({
  //   variables: {
  //     data: {
  //       author: 'aa',
  //     },
  //   },
  // }).then((ret) => {});

  // const [login] = useLoginMutation();
  // login({
  //   variables: {
  //     password: '',
  //     username: '',
  //   },
  // });

  return (
    <div>
      <button
        onClick={() => {
          addTest({
            variables: {
              a: 2,
              b: 2,
            },
          })
            .then(ret => {
              console.log(ret.data.addNumber);
            })
            .catch(e => {
              alert(e.message);
            });
        }}
      >
        click
      </button>
      {allTodos.map(todo => (
        <div key={todo.todoId}>{todo.description}</div>
      ))}
    </div>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const client = getApolloClient(ctx);
  const ret = await client.query<GetAllTodosQuery>({
    query: GetAllTodosDocument,
  });
  return {
    props: ret.data,
  };
};
