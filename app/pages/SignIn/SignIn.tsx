import React from 'react';
import Login from '../../components/base/src/staticPages/Login/Login'
import { useAuthDataContext } from 'utils/AuthDataProvider';

const SignIn: React.FC = () => {
  const { onLogin, loading } = useAuthDataContext();

  return (
    <div style={{ alignItems: 'center', height: '100vh' }}>
      <Login onSubmit={onLogin} loading={loading} />
    </div>
  );
};

export default SignIn;