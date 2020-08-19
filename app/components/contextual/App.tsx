import { hot } from 'react-hot-loader/root';
import React from 'react';
import AuthDataProvider from 'utils/AuthDataProvider';
import Layout from './Layout';
import Router from './Router';

const App: React.FC = () => (
  <AuthDataProvider>
    <Layout>
      <Router />
    </Layout>
  </AuthDataProvider>
);

export default hot(App);
