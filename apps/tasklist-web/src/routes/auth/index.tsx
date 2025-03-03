import { Route, Switch, Redirect } from 'wouter';
import { Screen } from '@repo/ui';
import { MainScreen } from '@/routes/auth/MainScreen';
import { ROUTES } from '@/constants/routes';
import { EditTask } from '@/routes/auth/features/EditTask';
import { MessagesPanel } from '@/features/MessagesPanel';

export const AuthenticatedRoutes = () => {
  return (
    <Screen>
      <Switch>
        <Route component={MainScreen} path={ROUTES.TASKS({ taskId: '*?' })} />
        <Redirect to={ROUTES.TASKS()} />
      </Switch>
      <Switch>
        <Route
          component={EditTask}
          path={ROUTES.TASKS({ taskId: ':taskId' })}
        />
      </Switch>
      <MessagesPanel />
    </Screen>
  );
};
