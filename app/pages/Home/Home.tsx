import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from 'components/contextual/Router';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Hello, world!</h1>
      <Link to={PATH.TEST_REDUX}>Test Redux Page</Link>
    </div>
  );
};

export default Home;
