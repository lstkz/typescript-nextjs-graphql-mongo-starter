import '../styles/globals.css';
import { ApolloProvider, gql } from '@apollo/client';
import { AppContext, AppProps } from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { getApolloClient } from '../getApolloClient';
import { AppDataDocument, AppDataQuery, User } from '../generated';
import React from 'react';
import { AuthModule } from '../components/AuthModule';

config.autoAddCss = false;

const client = getApolloClient();

interface GlobalProps {
  initialUser: User | null;
}

export default function App({
  Component,
  initialUser,
  pageProps,
}: AppProps & GlobalProps) {
  return (
    <ApolloProvider client={client}>
      <AuthModule initialUser={initialUser}>
        <Component {...pageProps} />
      </AuthModule>
    </ApolloProvider>
  );
}

gql`
  query AppData {
    me {
      ...allUserProps
    }
  }
  fragment allUserProps on User {
    id
    username
  }
`;

App.getInitialProps = async ({ ctx }: AppContext) => {
  const client = getApolloClient(ctx);
  if (!client.hasAccessToken()) {
    return {
      initialUser: null,
    };
  }
  const ret = await client.query<AppDataQuery>({
    query: AppDataDocument,
  });
  return {
    initialUser: ret.data.me,
  };
};
