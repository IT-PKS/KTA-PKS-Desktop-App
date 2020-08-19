import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from 'components/contextual/Router';

const NotFound: React.FC = () => {
  return (
    <div>
      <h2>NotFound</h2>
      <Link to={PATH.HOME}>Back to Home Page</Link>
    </div>
  );
};

export default NotFound;
