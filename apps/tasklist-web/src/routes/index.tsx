import { AuthenticatedRoutes } from '@/routes/auth';
import { useAuthStore } from '@/hooks/useAuthStore';
import { UnauthenticatedRoutes } from '@/routes/unauth';

export const Routes = () => {
  const { auth } = useAuthStore();

  if (auth) return <AuthenticatedRoutes />;
  return <UnauthenticatedRoutes />;
};
