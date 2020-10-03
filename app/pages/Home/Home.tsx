import React, { useState } from 'react';
import PersonalData from '../staticPage/PersonalData/PersonalData';
import { postMembersRegistration, saveToLocal } from '../../client/RegisterClient';
import { normalizePayload } from './HomeHelper';

const Home: React.FC = () => {
  const [state, setState] = useState<string | null>('default');
  const [loading, setLoading] = useState(false);

  const _hanldeOnSubmit = async (payload: any) => {
    setLoading(false);

    const { payloadRest, payloadLocal } = normalizePayload(payload);

    const reslocal = await saveToLocal(payloadLocal);
    const res = await postMembersRegistration(payloadRest);

    if (reslocal && res.message === 'Success') {
      setLoading(true);
      setState('success');
    } else {
      setLoading(true);
    }
  };

  return (
    <>
      <PersonalData state={state} onSubmit={_hanldeOnSubmit} loading={loading} />
    </>
  );
};

export default Home;
