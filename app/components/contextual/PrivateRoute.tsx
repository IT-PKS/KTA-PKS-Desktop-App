import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useAuthDataContext } from 'utils/AuthDataProvider';
import SignInPage from 'pages/SignIn/SignIn';

const PrivateRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const { user, finishChecking } = useAuthDataContext();
  const finalComponent = user ? component : SignInPage;

  if (finishChecking === false) {
    return <div>Authenticating..</div>;
  }

  return <Route {...rest} component={finalComponent} />;
};

export default PrivateRoute;
