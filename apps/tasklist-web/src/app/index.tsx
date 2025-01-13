import React from 'react';
import { Routes } from '@/routes';
import '@/utils/i18n';
import '@repo/ui/css/index.css';

export const App = () => {
  return (
    <React.StrictMode>
      <Routes />
    </React.StrictMode>
  );
};
