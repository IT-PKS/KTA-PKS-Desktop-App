import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import NotFoundPage from 'pages/NotFound/NotFound';
import SignInPage from 'pages/SignIn/SignIn';
import HomePage from 'pages/Home/Home';
import TestReduxPage from 'pages/TestRedux/TestRedux';
import LicenseKey from 'pages/LicenseKey/LicenseKey';

export const PATH = {
  HOME: '/',
  NOT_FOUND: '/not-found',
  SIGN_IN: '/sign-in',
  LICENSE_KEY: '/license-key',
  TEST_REDUX: '/test-redux',
} as const;

export default () => (
  <HashRouter>
    <Switch>
      <PrivateRoute exact path={PATH.HOME} component={HomePage} />
      <Route path={PATH.TEST_REDUX} component={TestReduxPage} />
      <Route path={PATH.SIGN_IN} component={SignInPage} />
      <Route path={PATH.LICENSE_KEY} component={LicenseKey} />
      <Route component={NotFoundPage} />
    </Switch>
  </HashRouter>
);
