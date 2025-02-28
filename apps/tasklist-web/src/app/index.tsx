import React from 'react';
import { Routes } from '@/routes';
import '@/utils/i18n';
import '@repo/ui/css/index.css';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/utils/apollo-client';

export const App = () => {
  return (
    <React.StrictMode>
      <ApolloProvider client={apolloClient}>
        <Routes />
      </ApolloProvider>
    </React.StrictMode>
  );
};
