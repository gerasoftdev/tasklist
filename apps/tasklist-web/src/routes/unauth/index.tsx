import { Route, Switch, Redirect } from 'wouter';
import { Screen } from '@repo/ui';
import { ROUTES } from '@/constants/routes';
import { SignIn } from '@/routes/unauth/signIn';
import { Main } from '@/components/Main';

export const UnauthenticatedRoutes = () => {
  return (
    <Screen className="py-lg">
      <Main className="p-lg">
        <Switch>
          <Route component={SignIn} path={ROUTES.SIGN_IN} />
          <Redirect to={ROUTES.SIGN_IN} />
        </Switch>
      </Main>
    </Screen>
  );
};
