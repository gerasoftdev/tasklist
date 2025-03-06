import { Route, Switch, Redirect } from 'wouter';
import { Screen } from '@repo/ui';
import { ROUTES } from '@/constants/routes';
import { SignIn } from '@/routes/unauth/signIn';
import { Main } from '@/components/Main';
import { SignUp } from '@/routes/unauth/signUp';
import { MessagesPanel } from '@/features/MessagesPanel';

export const UnauthenticatedRoutes = () => {
  return (
    <Screen className="py-lg">
      <Main className="p-lg">
        <Switch>
          <Route component={SignIn} path={ROUTES.SIGN_IN} />
          <Route component={SignUp} path={ROUTES.SIGN_UP} />
          <Redirect to={ROUTES.SIGN_IN} />
        </Switch>
        <MessagesPanel />
      </Main>
    </Screen>
  );
};
