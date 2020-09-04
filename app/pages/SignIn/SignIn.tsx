import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'kta-ui-components'

const SignIn: React.FC = () => {
  return (
    <div>
      <h2>SignIn</h2>
      <Input />
      <input type="text" />
      <Link to="/broken">Broken Link</Link>
    </div>
  );
};

export default SignIn;
