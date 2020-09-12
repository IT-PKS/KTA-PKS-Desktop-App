import React from 'react';
import { PersonalData } from 'kta-ui-components'


const Home: React.FC = (props: any) => {
  const handleSubmit = (values: any) => {
    console.log("handleSubmit -> values", values)
  }
  return (
    <div>
      <PersonalData onSubmit={handleSubmit} />
    </div>
  );
};

export default Home;
