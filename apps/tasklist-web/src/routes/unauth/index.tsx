import { Route, Switch, Redirect } from 'wouter';
import { Screen } from '@repo/ui';
import { ROUTES } from '@/constants/routes';
import { SignIn } from '@/routes/unauth/signIn';
import { Main } from '@/components/Main';
import { SignUp } from '@/routes/unauth/signUp';
import { MessagesPanel } from '@/features/MessagesPanel';
import { ResetPassword } from '@/routes/unauth/resetPassword';
import { SetPassword } from '@/routes/unauth/setPassword';

export const UnauthenticatedRoutes = () => {
  return (
    <Screen className="py-lg">
      <Main className="p-lg">
        <Switch>
          <Route component={SignIn} path={ROUTES.SIGN_IN} />
          <Route component={SignUp} path={ROUTES.SIGN_UP} />
          <Route component={ResetPassword} path={ROUTES.RESET_PASSWORD} />
          <Route
            component={SetPassword}
            path={ROUTES.SET_PASSWORD({ passwordTokenId: ':passwordTokenId' })}
          />
          <Redirect to={ROUTES.SIGN_IN} />
        </Switch>
        <MessagesPanel />
      </Main>
    </Screen>
  );
};
