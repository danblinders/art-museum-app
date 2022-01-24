import { useReducer, useEffect } from 'react';

const useMuseumData = (fetchFunc, ...fetchFuncArgs) => {
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
    dataToLoad = dataIds?.slice(offset, offset + 20),
    noFutureDataToLoad = dataIds?.length - offset < 20 ? true : false;

  const increaseOffset = (value) => {
    setState({offset: offset + value});
  };

  return {isLoading, isError, dataToLoad, noFutureDataToLoad, increaseOffset};
};

export { useMuseumData };