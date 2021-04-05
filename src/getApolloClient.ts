import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { GetServerSidePropsContext } from 'next';
import fetch from 'node-fetch';

export function getApolloClient(ctx?: GetServerSidePropsContext) {
  return new ApolloClient({
    link: new HttpLink({
      uri:
        (typeof document === 'undefined' ? 'http://localhost:3000' : '') +
        '/api/graphql',
      fetch: fetch as any,
    }),
    cache: new InMemoryCache(),
  });
}
