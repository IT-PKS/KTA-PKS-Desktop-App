import React from 'react';
import { Login } from 'kta-ui-components'
import { useAuthDataContext } from 'utils/AuthDataProvider';

const SignIn: React.FC = () => {
  const { onLogin } = useAuthDataContext();

  return (
      <div style={{ alignItems: 'center', height: '100vh' }}>
        <Login onLogin={onLogin} />
      </div>
  );
};

export default SignIn