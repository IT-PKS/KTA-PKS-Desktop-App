import React from 'react';
import { Link } from 'react-router-dom';

const SignIn: React.FC = () => {
  return (
    <div>
      <h2>SignIn</h2>
      <Link to="/broken">Broken Link</Link>
    </div>
  );
};

export default SignIn;
