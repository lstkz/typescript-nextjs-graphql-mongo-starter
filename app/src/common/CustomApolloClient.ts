import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import fetch from 'node-fetch';
import { setContext } from '@apollo/client/link/context';
import { getAccessToken } from './helper';
import { readCookieFromString } from './cookie';

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
      console.log('token', this.getAccessToken());
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
    if (typeof document === 'undefined') {
      return readCookieFromString(
        this.ctx?.req?.headers['cookie'] ?? '',
        'token'
      );
    }
    return getAccessToken();
  }
}
