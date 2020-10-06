import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useAuthDataContext } from 'utils/AuthDataProvider';
import SignInPage from 'pages/SignIn/SignIn';
import LicenseKey from '../../pages/LicenseKey/LicenseKey';
import Register from '../base/src/staticPages/Register/Register'
import Header from '../../pages/staticPage/header/Header'
import Sidebar from '../../pages/staticPage/Sidebar/Sidebar'
import TemplateDataProvider from './TemplateDataProvider'


const PrivateRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const { user, serialKey, finishChecking, onLogout } = useAuthDataContext();

  // const finalComponent = user ? component : SignInPage;
  const alReadyHaveSerialKey = user ? component : SignInPage;
  const finalComponent = serialKey ? LicenseKey : alReadyHaveSerialKey;

  if (finishChecking === false) {
    return <div>Authenticating..</div>;
  }

  const Template = (props: any) => (
    <Header>
      <Sidebar onLogout={onLogout} />
      {props.children}
    </Header>
  )

  const WithTemplate = () => (
    <Template>
      <Route {...rest} component={finalComponent} />
    </Template>
  )

  return (
    <TemplateDataProvider>
      {
        user ? <WithTemplate /> : <Route {...rest} component={finalComponent} />
      }
    </TemplateDataProvider>
  )
};

export default PrivateRoute;
