import * as apolloClientExports from '@apollo/client';
import type { MutationHookOptions } from '@apollo/client';
import type { GraphQLFormattedError } from 'graphql';
import { logout } from '@/utils/logout';

export * from '@apollo/client';

const logoutIfExpired = (error: GraphQLFormattedError) => {
  if (error.extensions?.doLogout) {
    logout();
  }
};

export const useQuery = <
  TData = unknown,
  TVariables extends
    apolloClientExports.OperationVariables = apolloClientExports.OperationVariables,
>(
  query:
    | apolloClientExports.DocumentNode
    | apolloClientExports.TypedDocumentNode<TData, TVariables>,
  options?: apolloClientExports.QueryHookOptions<TData, TVariables> | undefined,
) => {
  const result = apolloClientExports.useQuery(query, options);

  const error = result.error?.graphQLErrors[0];

  if (error) logoutIfExpired(error);

  return result;
};

export const useLazyQuery = <
  TData = unknown,
  TVariables extends
    apolloClientExports.OperationVariables = apolloClientExports.OperationVariables,
>(
  query:
    | apolloClientExports.DocumentNode
    | apolloClientExports.TypedDocumentNode<TData, TVariables>,
  options?: apolloClientExports.QueryHookOptions<TData, TVariables> | undefined,
) => {
  const result = apolloClientExports.useLazyQuery(query, options);

  const error = result[1].error?.graphQLErrors[0];

  if (error) logoutIfExpired(error);

  return result;
};

export const useMutation = <
  TData = unknown,
  TVariables extends
    apolloClientExports.OperationVariables = apolloClientExports.OperationVariables,
>(
  query:
    | apolloClientExports.DocumentNode
    | apolloClientExports.TypedDocumentNode<TData, TVariables>,
  options?: MutationHookOptions<TData, TVariables> | undefined,
) => {
  const result = apolloClientExports.useMutation(query, options);

  const error = result[1].error?.graphQLErrors[0];

  if (error) logoutIfExpired(error);

  return result;
};
