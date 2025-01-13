import { Route, Switch, Redirect } from 'wouter';
import { Screen, Text } from '@repo/ui';
import { useTranslation } from 'react-i18next';

// Mock component, remove
const HelloWorld = () => {
  const { t } = useTranslation('common');
  return <Text>{t('welcome')}</Text>;
};

export const AuthenticatedRoutes = () => {
  return (
    <Screen>
      <Switch>
        <Route component={HelloWorld} path="/" />
        <Redirect to="/" />
      </Switch>
    </Screen>
  );
};
