/* eslint-disable @typescript-eslint/no-explicit-any -- test utils, allow any */
/* eslint-disable no-console -- to be able to see logs in tests */

import '@/utils/i18n';

import React, { useEffect } from 'react';
import type { FC, PropsWithChildren, ReactElement } from 'react';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { Router } from 'wouter';
import { memoryLocation } from 'wouter/memory-location';
import type { MockTaskType } from '@repo/types';
import { onError } from '@apollo/client/link/error';
import * as apolloTesting from '@apollo/client/testing';
import type { DocumentNode, Unmasked } from '@apollo/client';
import { ApolloLink } from '@apollo/client';
import type { GraphQLFormattedError } from 'graphql';
import { useMockTaskApi } from '@/hooks/mockTaskApi';
import { useMessageStore } from '@/hooks/useMessageStore';
import type { MessageInput } from '@/hooks/useMessageStore';

export const MOCK_LOADING_TIME = 30;

type MockedApolloProviderProps = Omit<
  Pick<apolloTesting.MockedProviderProps, 'mocks' | 'addTypename'>,
  'children'
>;

type MockQueryProps<R = Record<string, any>, V = Record<string, any>> = {
  variables?: V;
  result?: Unmasked<R>;
  errors?: GraphQLFormattedError[];
  loadingFor?: number;
  withLoading?: boolean;
};
export const mockQuery =
  <R extends Record<string, any>, V extends Record<string, any>>(
    query: DocumentNode,
    defaultProps?: MockQueryProps<R, V>,
  ) =>
  ({
    variables,
    result,
    loadingFor,
    errors,
    withLoading,
  }: MockQueryProps<R, V> | undefined = {}): apolloTesting.MockedResponse<
    R,
    V
  > => {
    const err = defaultProps?.errors || errors;
    return {
      delay:
        (withLoading ?? defaultProps?.withLoading)
          ? (loadingFor ?? defaultProps?.loadingFor) || MOCK_LOADING_TIME
          : undefined,
      request: {
        query,
        variables: variables ?? defaultProps?.variables,
      },
      result: {
        ...(err ? { errors: err } : {}),
        data: result ?? defaultProps?.result,
      },
    };
  };

export const MockedApolloProvider: FC<
  PropsWithChildren<MockedApolloProviderProps>
> = ({ children, mocks = [] }) => {
  const mockLink = new apolloTesting.MockLink(mocks);
  const errorLoggingLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        );
      });

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  const link = ApolloLink.from([errorLoggingLink, mockLink]);

  return (
    <apolloTesting.MockedProvider addTypename link={link} mocks={mocks}>
      {children}
    </apolloTesting.MockedProvider>
  );
};

type RouterProps = {
  path?: string;
  location?: ReturnType<typeof memoryLocation>;
};

type Options = RouterProps & RenderOptions;

export const MockProviders = ({ path, location }: Options = {}) => {
  const ProvidersComponent: FC<PropsWithChildren<object>> = ({ children }) => {
    const { hook } = location || memoryLocation({ path, record: true });
    return <Router hook={hook}>{children}</Router>;
  };
  return ProvidersComponent;
};

type OptionsWithApollo = Options & MockedApolloProviderProps;

export const MockProvidersWithApollo = ({
  path,
  mocks,
  location,
  addTypename = false,
}: OptionsWithApollo = {}) => {
  const ProvidersComponent: FC<PropsWithChildren<object>> = ({ children }) => {
    const { hook } = location || memoryLocation({ path, record: true });
    return (
      <MockedApolloProvider addTypename={addTypename} mocks={mocks}>
        <Router hook={hook}>{children}</Router>
      </MockedApolloProvider>
    );
  };
  return ProvidersComponent;
};

/**
 * Provide provider wrapped render
 */
const customRender = (ui: ReactElement, options?: OptionsWithApollo) =>
  render(ui, { wrapper: MockProvidersWithApollo(options), ...options });

export const wait = (timeout = 0) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, timeout);
  });

export * from '@testing-library/react';

export { customRender as render };

export const usePopulateTasks = (tasks: MockTaskType[]) => {
  useEffect(() => {
    const originalState = useMockTaskApi.getState();
    useMockTaskApi.setState({ ...originalState, tasks }, true);

    return () => {
      useMockTaskApi.setState(originalState, true);
    };
  }, [tasks]);
};

export const usePopulateMessages = (messages: MessageInput[]) => {
  useEffect(() => {
    const originalState = useMessageStore.getState();
    useMessageStore.setState({ ...originalState }, true);
    const newState = useMessageStore.getState();
    newState.addMessages(messages);

    return () => {
      useMessageStore.setState(originalState, true);
    };
  }, [messages]);
};
