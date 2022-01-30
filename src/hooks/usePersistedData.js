import { useState, useEffect } from 'react';

const usePersistedData = (key, initialValue = null) => {
  const [data, setData] = useState(() => {
    return JSON.parse(sessionStorage.getItem(key)) || initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return [data, setData];
};

export default usePersistedData;