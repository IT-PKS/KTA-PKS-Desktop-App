import React from 'react';
import { Login } from 'kta-ui-components'

import { useAuthDataContext } from 'utils/AuthDataProvider';

const SignIn: React.FC = (props) => {
  const { onLogin } = useAuthDataContext();

  return (
    <>
      <form onSubmit={onLogin} style={{ alignItems: 'center', height: '100vh' }}>
        <Login />
      </form>
    </>
  );
};


export default SignIn