import React from 'react';

function useDidMount(callback: React.EffectCallback) {
  React.useEffect(() => {
    callback();
  }, []);
}

export default useDidMount;
