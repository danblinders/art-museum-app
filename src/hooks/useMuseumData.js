import { useReducer, useEffect, useMemo } from 'react';

const useMuseumData = (offsetStep, fetchFunc, ...fetchFuncArgs) => {
  const [state, setState] = useReducer(
    (prevState, newState) => ({...prevState, ...newState}),
    {isLoading: true, isError: false, dataIds: null, offset: 0}
  );

  useEffect(() => {
    fetchFunc(...fetchFuncArgs)
      .then(result => setState({isLoading: false, dataIds: result}))
      .catch(error => setState({isLoading: false, isError: true}));
  }, []);

  const
    {dataIds, isLoading, isError, offset} = state,
    dataToLoad = useMemo(() => dataIds?.slice(offset, offset + offsetStep), [dataIds, offset]) ,
    noFutureDataToLoad = dataIds?.length - offset < offsetStep ? true : false;

  const increaseOffset = () => setState({offset: offset + offsetStep});

  return {isLoading, isError, dataToLoad, noFutureDataToLoad, increaseOffset};
};

export { useMuseumData };