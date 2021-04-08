import { GetServerSideProps } from 'next';

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
    const status = e.res?.status;
    console.log({ e });
    if (status == 401) {
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
