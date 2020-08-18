import { hot } from 'react-hot-loader/root';
import React from 'react';
import AuthDataProvider from 'utils/AuthDataProvider';
import Router from './Router';

const App: React.FC<{}> = () => (
  <AuthDataProvider>
    <Router />
  </AuthDataProvider>
);

export default hot(App);
