import { Logout } from '@repo/graphql';
import { useAuthStore } from '@/hooks/useAuthStore';
import { apolloClient } from '@/utils/apollo-client';
import { useAppStore } from '@/hooks/useAppStore';

export const logout = () => {
  const { isLoggingOut, setIsLoggingOut } = useAppStore.getState();
  const { auth, reset } = useAuthStore.getState();

  if (!auth || isLoggingOut) return;
  setIsLoggingOut(true);

  apolloClient.mutate({ mutation: Logout }).finally(() => {
    reset();
    apolloClient.resetStore();
    setIsLoggingOut(false);
  });
};
