import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { theme, globalStyles } from 'components/base';
import AuthDataProvider from 'utils/AuthDataProvider';
import Router from './Router';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles(theme)} />
    <AuthDataProvider>
      <Router />
    </AuthDataProvider>
  </ThemeProvider>
);

export default hot(App);
