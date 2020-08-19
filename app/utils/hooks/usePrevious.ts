import { useEffect, useRef } from 'react';

/**
 * @example const prevProps = usePrevious<PropsDefinition>(props);
 */
const usePrevious = <T>(value: T) => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePrevious;
