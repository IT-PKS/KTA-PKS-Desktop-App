import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useAuthDataContext } from 'utils/AuthDataProvider';
import SignInPage from 'pages/SignIn/SignIn';
import LicenseKey from 'pages/LicenseKey/LicenseKey';
import { Header, Sidebar } from 'kta-ui-components'
import TemplateDataProvider from '../base/src/context/TemplateDataProvider'


const PrivateRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const { user, finishChecking, onLogout } = useAuthDataContext();

  const finalComponent = user ? component : LicenseKey;

  if (finishChecking === false) {
    return <div>Authenticating..</div>;
  }

  const Template = (props: any) => (
    <Header>
      <Sidebar onLogout={onLogout} />
      {props.children}
    </Header>
  )

  const withTemplate = () => (
    <Template>
      <Route {...rest} component={finalComponent} />
    </Template>
  )

  return (
    <TemplateDataProvider>
      {
        user ? withTemplate : <Route {...rest} component={finalComponent} />
      }


    </TemplateDataProvider>
  )
};

export default PrivateRoute;
