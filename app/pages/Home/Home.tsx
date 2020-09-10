import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from 'components/contextual/Router';
import { PersonalData } from 'kta-ui-components'


const Home: React.FC = () => {

  return (
    <div>
      <PersonalData />
      {/* <h1>Hello, world!</h1>
      <Link to={PATH.TEST_REDUX}>Test Redux Page</Link>
      <button onClick={onLogout}>Logout</button> */}

    </div>
  );
};

export default Home;
