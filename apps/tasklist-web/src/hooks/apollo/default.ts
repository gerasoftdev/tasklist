/* eslint-disable @typescript-eslint/no-explicit-any -- extending types from @apollo/client */
import * as apolloClientExports from '@apollo/client';
import type { GraphQLFormattedError } from 'graphql';
import { useEffect } from 'react';
import { logout } from '@/utils/logout';
import { useMessageStore, type MessageInput } from '@/hooks/useMessageStore';

export * from '@apollo/client';

type CustomHookProps = {
  preventToastErrors?: boolean;
};

export type MutationHookOptions<
  TData = any,
  TVariables = apolloClientExports.OperationVariables,
  TContext = apolloClientExports.DefaultContext,
  TCache extends
    apolloClientExports.ApolloCache<any> = apolloClientExports.ApolloCache<any>,
> = apolloClientExports.MutationHookOptions<
  TData,
  TVariables,
  TContext,
  TCache
> &
  CustomHookProps;

export type QueryHookOptions<
  TData = any,
  TVariables extends
    apolloClientExports.OperationVariables = apolloClientExports.OperationVariables,
> = apolloClientExports.QueryHookOptions<TData, TVariables> & CustomHookProps;

const handleErrors = (
  errors: readonly GraphQLFormattedError[],
  preventToastErrors = false,
) => {
  if (errors.some((error) => error.extensions?.doLogout)) {
    logout();
  }
  if (!preventToastErrors) {
    const messages: MessageInput[] = errors.map((error) => ({
      type: 'error',
      text: error.message,
      ...error.extensions,
    }));
    useMessageStore.getState().addMessages(messages);
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
  options?: QueryHookOptions<TData, TVariables> | undefined,
) => {
  const result = apolloClientExports.useQuery(query, options);

  const errors = result.error?.graphQLErrors;

  useEffect(() => {
    if (errors?.length) handleErrors(errors);
  }, [errors]);

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
  options?: QueryHookOptions<TData, TVariables> | undefined,
) => {
  const result = apolloClientExports.useLazyQuery(query, options);

  const errors = result[1].error?.graphQLErrors;

  useEffect(() => {
    if (errors?.length) handleErrors(errors);
  }, [errors]);

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

  useEffect(() => {
    if (errors?.length) handleErrors(errors, options?.preventToastErrors);
  }, [errors, options?.preventToastErrors]);

  return result;
};
