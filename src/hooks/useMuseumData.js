import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import usePersistedData from './usePersistedData';

const useMuseumData = (offsetStep, fetchFunc, ...fetchFuncArgs) => {
  const [museumDataState, updateMuseumDataState] = usePersistedData(
    `museum_data_${useLocation().key}`,
    {isLoading: true, errorRes: {status: false, message: ''}, dataIds: null, offset: 0}
  );

  const setMuseumDataState = (newValue) => {
    updateMuseumDataState(prevState => ({...prevState, ...newValue}));
  };

  const
    {dataIds, isLoading, errorRes, offset} = museumDataState,
    dataToLoad = useMemo(() => dataIds?.slice(offset, offset + offsetStep), [dataIds, offset, offsetStep]),
    noFutureDataToLoad = dataIds?.length - offset <= offsetStep ? true : false;

  useEffect(() => {
    if (!dataIds) {
      fetchFunc(...fetchFuncArgs)
        .then(result => setMuseumDataState({dataIds: result}))
        .catch(e => setMuseumDataState({errorRes: {status: true, message: e.message}, isLoading: false}));
    }
  }, []);

  return {isLoading, offset, errorRes, dataToLoad, noFutureDataToLoad, setMuseumDataState};
};

export default useMuseumData;