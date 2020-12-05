import React, { useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useAuthDataContext } from 'utils/AuthDataProvider';
import SignInPage from 'pages/SignIn/SignIn';
import LicenseKey from '../../pages/LicenseKey/LicenseKey';
import Sidebar from '../../pages/staticPage/Sidebar/Sidebar';
import TemplateDataProvider from './TemplateDataProvider';
import Header from '../base/src/components/Dashboard/Header'
import LogoPortrait from '../Logo/LogoPortrait'

const PrivateRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const { user, serialKey, finishChecking, onLogout } = useAuthDataContext();
  const alReadyHaveSerialKey = user ? component : SignInPage;
  const finalComponent = serialKey ? alReadyHaveSerialKey : LicenseKey;

  if (finishChecking === false) {
    return <div>Authenticating..</div>;
  }

  const Template = (props: any) => (
    <>
      <Header logo={LogoPortrait} dropdownMenu={[{ label: 'Logout', onClick: onLogout }]} />
      <Sidebar />
      {props.children}
    </>
  )

  const WithTemplate = () => {
    return (
      <Template>
        <Route {...rest} component={finalComponent} />
      </Template>
    )
  }


  return (
    <TemplateDataProvider>
      {
        serialKey && user ? <WithTemplate /> : <Route {...rest} component={finalComponent} />
      }
    </TemplateDataProvider>
  )
};

export default PrivateRoute;
