import { useState, useEffect } from 'react';

const useArtworks = (fetchFunc, ...fetchFuncArgs) => {
  const [artworksIds, setArtworksIds] = useState(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchFunc(...fetchFuncArgs)
      .then(result => setArtworksIds(result));
  }, []);

  let artworksToLoad = artworksIds?.slice(offset, offset + 20);

  return {artworksToLoad, setOffset};
};

export { useArtworks };