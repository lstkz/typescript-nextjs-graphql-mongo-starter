import { GetServerSideProps } from 'next';
import { createCookie, readCookie, removeCookie } from './cookie';

export class UnreachableCaseError extends Error {
  constructor(val: never) {
    super(
      `Unreachable case: ${typeof val === 'string' ? val : JSON.stringify(val)}`
    );
  }
}

export const createGetServerSideProps: <T>(
  fn: GetServerSideProps<T>
) => GetServerSideProps<T> = fn => async context => {
  try {
    return await fn(context);
  } catch (e) {
    const code = e?.graphQLErrors?.[0].extensions?.code;
    if (code === 'UNAUTHENTICATED') {
      context.res.setHeader(
        'Set-Cookie',
        'token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      );
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    throw e;
  }
};

export const getAccessToken = () => {
  return readCookie('token');
};

export const setAccessToken = (token: string) => {
  createCookie('token', token);
};

export const clearAccessToken = () => {
  removeCookie('token');
};
