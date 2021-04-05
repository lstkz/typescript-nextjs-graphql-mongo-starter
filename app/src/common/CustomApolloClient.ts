import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import fetch from 'node-fetch';
import { setContext } from '@apollo/client/link/context';
import { getAccessToken } from './helper';
import { readCookieFromString } from './cookie';
import { getMainDefinition } from '@apollo/client/utilities';
import { API_URL, IS_SSR } from '../config';

export class CustomApolloClient extends ApolloClient<NormalizedCacheObject> {
  public accessToken: string | null;
  private ctx?: GetServerSidePropsContext | NextPageContext;

  constructor(ctx?: GetServerSidePropsContext | NextPageContext) {
    const httpLink = new HttpLink({
      uri: API_URL + '/api/graphql',
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
    const mainLink = authLink.concat(httpLink);
    const wsLink = IS_SSR
      ? null
      : new WebSocketLink({
          uri: API_URL.replace(/^http/, 'ws') + '/subscriptions',
          options: {
            reconnect: true,
            connectionParams: () => ({
              authorization: this.getAccessToken(),
            }),
          },
        });
    super({
      link: wsLink
        ? split(
            ({ query }) => {
              const definition = getMainDefinition(query);
              return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
              );
            },
            wsLink,
            mainLink
          )
        : mainLink,
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
