import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useAuthDataContext } from 'utils/AuthDataProvider';
import SignInPage from 'pages/SignIn/SignIn';
import LicenseKey from '../../pages/LicenseKey/LicenseKey';
import Header from '../../pages/staticPage/header/Header';
import Sidebar from '../../pages/staticPage/Sidebar/Sidebar';
import TemplateDataProvider from './TemplateDataProvider';


const PrivateRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const { user, serialKey, onLogout } = useAuthDataContext();

  const alReadyHaveSerialKey = user ? component : SignInPage;
  const finalComponent = serialKey ? alReadyHaveSerialKey : LicenseKey;

  const Template = (props: any) => (
    <Header>
      <Sidebar onLogout={onLogout} />
      {props.children}
    </Header>
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
        user ? <WithTemplate /> : <Route {...rest} component={finalComponent} />
      }
    </TemplateDataProvider>
  )
};

export default PrivateRoute;
