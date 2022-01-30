import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import usePersistedData from './usePersistedData';

const useMuseumData = (offsetStep, fetchFunc, ...fetchFuncArgs) => {
  const [museumDataState, updateMuseumDataState] = usePersistedData(
    `museum_data_${useLocation().key}`,
    {isLoading: true, isError: false, dataIds: null, offset: 0}
  );

  const setMuseumDataState = (newValue) => {
    updateMuseumDataState(prevState => ({...prevState, ...newValue}));
  };

  const
    {dataIds, isLoading, isError, offset} = museumDataState,
    dataToLoad = useMemo(() => dataIds?.slice(offset, offset + offsetStep), [dataIds, offset, offsetStep]),
    noFutureDataToLoad = dataIds?.length - offset <= offsetStep ? true : false;

  useEffect(() => {
    fetchFunc(...fetchFuncArgs)
      .then(result => setMuseumDataState({dataIds: result}))
      .catch(error => setMuseumDataState({isError: true, isLoading: false}));
  }, []);

  return {isLoading, offset, isError, dataToLoad, noFutureDataToLoad, setMuseumDataState};
};

export { useMuseumData };