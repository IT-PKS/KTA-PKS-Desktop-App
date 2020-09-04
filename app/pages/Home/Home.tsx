import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from 'components/contextual/Router';

import { useAuthDataContext } from 'utils/AuthDataProvider';

const Home: React.FC = () => {
  const { onLogout } = useAuthDataContext();

  return (
    <div>
      <h1>Hello, world!</h1>
      <Link to={PATH.TEST_REDUX}>Test Redux Page</Link>
      <button onClick={onLogout}>Logout</button>

    </div>
  );
};

export default Home;
