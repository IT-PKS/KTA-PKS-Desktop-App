import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useAuthDataContext } from 'utils/AuthDataProvider';
import SignInPage from 'pages/SignIn/SignIn';
import { Header, Sidebar } from 'kta-ui-components'
import TemplateDataProvider from '../base/src/context/TemplateDataProvider'


const PrivateRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const { user, finishChecking, onLogout } = useAuthDataContext();

  const finalComponent = user ? component : SignInPage;

  if (finishChecking === false) {
    return <div>Authenticating..</div>;
  }

  return (
    <TemplateDataProvider>
      <Header>
        <Sidebar onLogout={onLogout} />
        <Route {...rest} component={finalComponent} />
      </Header>
    </TemplateDataProvider>
  )
};

export default PrivateRoute;
