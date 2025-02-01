import { Route, Switch, Redirect } from 'wouter';
import { Screen } from '@repo/ui';
import { MainScreen } from '@/routes/auth/MainScreen';
import { ROUTES } from '@/constants/routes';

export const AuthenticatedRoutes = () => {
  return (
    <Screen>
      <Switch>
        <Route component={MainScreen} path={ROUTES.TASKS({ taskId: '*?' })} />
        <Redirect to={ROUTES.TASKS()} />
      </Switch>
    </Screen>
  );
};
