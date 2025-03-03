import '@/utils/i18n';

import {
  useEffect,
  type FC,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { Router } from 'wouter';
import { memoryLocation } from 'wouter/memory-location';
import type { MockTaskType } from '@repo/types';
import type { MessageInput } from '@/hooks/useMessageStore';
import { useMessageStore } from '@/hooks/useMessageStore';
import { useMockTaskApi } from '@/hooks/mockTaskApi';

export const MOCK_LOADING_TIME = 30;

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

/**
 * Provide provider wrapped render
 */
const customRender = (ui: ReactElement, options?: Options) =>
  render(ui, { wrapper: MockProviders(options), ...options });

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
