import { useReducer, useEffect } from 'react';

const useArtworks = (fetchFunc, ...fetchFuncArgs) => {
  const [state, setState] = useReducer(
    (prevState, newState) => ({...prevState, ...newState}),
    {isLoading: true, artworksIds: null, offset: 0}
  );

  useEffect(() => {
    fetchFunc(...fetchFuncArgs)
      .then(result => setState({isLoading: false, artworksIds: result}));
  }, []);

  const
    {artworksIds, isLoading, offset} = state,
    artworksToLoad = artworksIds?.slice(offset, offset + 20),
    noFutureArtworksToLoad = artworksIds?.length - offset < 20 ? true : false;

  const increaseOffset = (value) => {
    setState({offset: offset + value});
  };

  return {isLoading, artworksToLoad, noFutureArtworksToLoad, increaseOffset};
};

export { useArtworks };