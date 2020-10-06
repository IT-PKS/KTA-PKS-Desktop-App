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
  console.log("serialKey", serialKey)

  // const finalComponent = user ? component : SignInPage;
  let finalComponent: any = LicenseKey

  if (user && serialKey) {
    finalComponent = component
  } else if (serialKey) {
    finalComponent = SignInPage
  }

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
