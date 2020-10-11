import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import NotFoundPage from 'pages/NotFound/NotFound';
import SignInPage from 'pages/SignIn/SignIn';
import HomePage from 'pages/Home/Home';
import LicenseKey from 'pages/LicenseKey/LicenseKey';
import Ringkasan from 'pages/staticPage/ringkasan/Ringkasan';
import Validasi from 'pages/staticPage/validasi/Validasi'
import DataKta from 'pages/staticPage/dataKta/DataKta'
import Laporan from 'pages/staticPage/laporan/Laporan'
import Pengaturan from 'pages/staticPage/pengaturan/Pengaturan'
import ForgotPassword from 'pages/staticPage/ForgotPassword/ForgotPassword'
import NewPassword from '../../pages/staticPage/ForgotPassword/NewPassword'


export const PATH = {
  HOME: '/',
  NOT_FOUND: '/not-found',
  SIGN_IN: '/sign-in',
  LICENSE_KEY: '/license-key',
  TEST_REDUX: '/test-redux',
  DASHBOARD: '/ringkasan',
  VALIDATION: '/validasi',
  DATA_KTA: '/data-kta',
  REPORT: '/laporan',
  CONFIG: '/pengaturan',
  FORGOT_PASSWORD: '/forgot-password',
  ENTER_NEW_PASSWORD: '/enter-new-password',
} as const;

export default () => (
  <HashRouter>
    <Switch>
      <PrivateRoute exact path={PATH.HOME} component={HomePage} />
      <PrivateRoute path={PATH.DASHBOARD} component={Ringkasan} />
      <PrivateRoute path={PATH.VALIDATION} component={Validasi} />
      <PrivateRoute path={PATH.DATA_KTA} component={DataKta} />
      <PrivateRoute path={PATH.REPORT} component={Laporan} />
      <PrivateRoute path={PATH.CONFIG} component={Pengaturan} />
      <Route path={PATH.SIGN_IN} component={SignInPage} />
      <Route path={PATH.FORGOT_PASSWORD} component={ForgotPassword} />
      <Route path={PATH.ENTER_NEW_PASSWORD} component={NewPassword} />
      <Route path={PATH.LICENSE_KEY} component={LicenseKey} />
      <Route component={NotFoundPage} />
    </Switch>
  </HashRouter>
);
