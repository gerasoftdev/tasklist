/* v8 ignore start */
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import type { GeneralError } from '@repo/utils';
import { sToMs } from '@repo/utils';
import { t } from 'i18next';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useMessageStore } from '@/hooks/useMessageStore';

const handleNetworkError = (e: Error | GeneralError) => {
  useMessageStore.getState().addMessages([
    {
      type: 'error',
      ...('extensions' in e ? e.extensions : {}),
      text: e.message || t('errors:somethingWentWrong'),
    },
  ]);
};

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_API_URL}/graphql`,
  credentials: 'include',
});

let refreshTokenPromise: Promise<void> | null = null;

const authLink = setContext(
  async (_, { headers }: { headers?: Record<string, string> }) => {
    const { auth } = useAuthStore.getState();

    if (auth?.exp && auth.exp * sToMs < Date.now()) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = fetch(
          `${import.meta.env.VITE_API_URL}/auth/refreshTokens`,
          {
            method: 'POST',
            credentials: 'include',
          },
        )
          .then((res) => res.json())
          .then((body: { accessToken: string }) => {
            const newAccessToken = body.accessToken;

            if (newAccessToken) {
              useAuthStore
                .getState()
                .setTokens({ accessToken: newAccessToken });
            }
          })
          .catch((e: GeneralError | Error) => {
            handleNetworkError(e);
            useAuthStore.getState().reset();
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }
      await refreshTokenPromise;
    }
    const { accessToken } = useAuthStore.getState();

    return {
      headers: {
        ...(headers || {}),
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    };
  },
);

const errorLink = onError(({ networkError }) => {
  if (networkError) {
    handleNetworkError(networkError);
  }
});

const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  credentials: 'include',
  cache: new InMemoryCache({}),
});

apolloClient.defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
  },
};

export { apolloClient };
/* v8 ignore stop */
