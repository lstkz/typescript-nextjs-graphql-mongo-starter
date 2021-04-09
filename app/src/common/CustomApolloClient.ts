import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import fetch from 'node-fetch';
import { setContext } from '@apollo/client/link/context';

export class CustomApolloClient extends ApolloClient<NormalizedCacheObject> {
  public accessToken: string | null;
  private ctx?: GetServerSidePropsContext | NextPageContext;

  constructor(ctx?: GetServerSidePropsContext | NextPageContext) {
    const httpLink = new HttpLink({
      uri:
        (typeof document === 'undefined' ? 'http://localhost:3000' : '') +
        '/api/graphql',
      fetch: fetch as any,
    });

    const authLink = setContext((_, { headers }) => {
      if (!this.hasAccessToken()) {
        return headers;
      }
      return {
        headers: {
          ...headers,
          authorization: this.getAccessToken(),
        },
      };
    });
    super({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
    this.accessToken = null;
    this.ctx = ctx;
  }

  hasAccessToken() {
    return !!this.getAccessToken();
  }

  getAccessToken() {
    return this.ctx?.req?.headers?.['authorization'];
  }
}
