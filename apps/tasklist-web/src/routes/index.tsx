import { useEffect } from 'react';
import { useHealthQuery } from '@/hooks/apollo/api';
import { AuthenticatedRoutes } from '@/routes/auth';

export const Routes = () => {
  const { data } = useHealthQuery();

  useEffect(() => {
    // eslint-disable-next-line no-console -- temporary logging to test API
    console.log(`Is API healthy?`, data?.health);
  }, [data]);

  return <AuthenticatedRoutes />;
};
