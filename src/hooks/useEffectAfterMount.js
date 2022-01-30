import { useEffect, useRef } from 'react';

const useEffectAfterMount = (func, depsArr) => {
  let isMountRef = useRef(false);

  useEffect(() => {
    if (!isMountRef.current) {
      isMountRef.current = true;
    } else {
      func();
    }
  }, [...depsArr]);
};

export default useEffectAfterMount;