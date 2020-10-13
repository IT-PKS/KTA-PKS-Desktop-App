import React, { useState } from 'react';
import PersonalData from '../staticPage/PersonalData/PersonalData';
import { postMembersRegistration, saveToLocal } from 'client/RegisterClient';
import { normalizePayload } from './HomeHelper';

const Home: React.FC = () => {
  const [state, setState] = useState<string | null>('default');
  const [loading, setLoading] = useState(false);

  const _hanldeOnSubmit = async (payload: any) => {
    setLoading(true);

    const { payloadRest, payloadLocal } = normalizePayload(payload);

    // const reslocal = await saveToLocal(payloadLocal);
    const { data, error } = await postMembersRegistration(payloadRest);

    if (data) { //reslocal && 
      setState('success');
      setLoading(false);
    } else {
      alert(`${error.message} - ${JSON.stringify(error.error)}`)
      setLoading(false);
    }
  };

  return (
    <>
      <PersonalData
        state={state}
        setState={setState}
        onSubmit={_hanldeOnSubmit}
        loading={loading}
      />
    </>
  );
};

export default Home;
