import * as Types from "./graphql";

import * as Operations from "./graphql";
import { NextRouter, useRouter } from "next/router";
import { QueryHookOptions, useQuery } from "@apollo/client";
import * as Apollo from "@apollo/client";
import type React from "react";
import { getApolloClient } from "../getApolloClient";
export async function getServerPageGetAllTodos(
  options: Omit<Apollo.QueryOptions<Types.GetAllTodosQueryVariables>, "query">,
  ctx?: any
) {
  const apolloClient = getApolloClient(ctx);

  const data = await apolloClient.query<Types.GetAllTodosQuery>({
    ...options,
    query: Operations.GetAllTodosDocument,
  });

  const apolloState = apolloClient.cache.extract();

  return {
    props: {
      apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  };
}
export const useGetAllTodos = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.GetAllTodosQuery, Types.GetAllTodosQueryVariables>
) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetAllTodosDocument, options);
};
export type PageGetAllTodosComp = React.FC<{
  data?: Types.GetAllTodosQuery;
  error?: Apollo.ApolloError;
}>;
export const ssrGetAllTodos = {
  getServerPage: getServerPageGetAllTodos,

  usePage: useGetAllTodos,
};
