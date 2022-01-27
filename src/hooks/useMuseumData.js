import { useReducer, useEffect, useMemo } from 'react';

const useMuseumData = (offsetStep, fetchFunc, ...fetchFuncArgs) => {
  const [state, setMuseumDataState] = useReducer(
    (prevState, newState) => ({...prevState, ...newState}),
    {isLoading: true, isError: false, dataIds: null, offset: 0}
  );

  useEffect(() => {
    fetchFunc(...fetchFuncArgs)
      .then(result => setMuseumDataState({dataIds: result}))
      .catch(error => setMuseumDataState({isError: true}));
  }, []);

  const
    {dataIds, isLoading, isError, offset} = state,
    dataToLoad = useMemo(() => dataIds?.slice(offset, offset + offsetStep), [dataIds, offset]) ,
    noFutureDataToLoad = dataIds?.length - offset < offsetStep ? true : false;

  return {isLoading, offset, isError, dataToLoad, noFutureDataToLoad, setMuseumDataState};
};

export { useMuseumData };