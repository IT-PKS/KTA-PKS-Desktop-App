import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'kta-ui-components'

import { useAuthDataContext } from 'utils/AuthDataProvider';


const SignIn: React.FC = () => {
  const { onLogin } = useAuthDataContext();

  return (
    <div>
      <h2>SignIn</h2>
      <form onClick={onLogin}>
        <Input />
        <button type="submit">Login</button>
      </form>

      <Link to="/broken">Broken Link</Link>
    </div>
  );
};

export default SignIn;
