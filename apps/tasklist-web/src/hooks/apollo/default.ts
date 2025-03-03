import * as apolloClientExports from '@apollo/client';
import type { MutationHookOptions } from '@apollo/client';
import type { GraphQLFormattedError } from 'graphql';
import { logout } from '@/utils/logout';
import { useMessageStore, type MessageInput } from '@/hooks/useMessageStore';

export * from '@apollo/client';

const handleErrors = (errors: readonly GraphQLFormattedError[]) => {
  if (errors.some((error) => error.extensions?.doLogout)) {
    logout();
  }
  const messages: MessageInput[] = errors.map((error) => ({
    type: 'error',
    text: error.message,
    ...error.extensions,
  }));
  useMessageStore.getState().addMessages(messages);
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

  const errors = result.error?.graphQLErrors;

  if (errors?.length) handleErrors(errors);

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

  const errors = result[1].error?.graphQLErrors;

  if (errors) handleErrors(errors);

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

  const errors = result[1].error?.graphQLErrors;

  if (errors) handleErrors(errors);

  return result;
};
