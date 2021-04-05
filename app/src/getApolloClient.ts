import { GetServerSidePropsContext, NextPageContext } from 'next';
import { CustomApolloClient } from './common/CustomApolloClient';

export function getApolloClient(
  ctx?: GetServerSidePropsContext | NextPageContext
) {
  return new CustomApolloClient(ctx);
}
