import { ApolloProvider } from '@apollo/client';
import { getApolloClient } from '../getApolloClient';

const client = getApolloClient();

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
