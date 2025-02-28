/* v8 ignore start */
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { sToMs } from '@repo/utils';
import { useAuthStore } from '@/hooks/useAuthStore';

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
          .catch(() => {
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

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
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
