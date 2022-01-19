import { useEffect, useState } from 'react/cjs/react.development';
import { useSearchParams } from 'react-router-dom';
import MuseumApi from '../../../service/MuseumApi';
import ArtworksWithLoad from '../../artworksWithLoad/ArtworksWithLoad';

const ArtworksCollectionPage = () => {
  const [artworksIds, setArtworksIds] = useState(null);
  const [offset, setOffset] = useState(0);

  const MuseumServiceApi = new MuseumApi();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const {q: term, ...filters} = Object.fromEntries([...searchParams]);

    MuseumServiceApi.getArtworksWithFilters(term, filters)
      .then(result => setArtworksIds(result));
  }, []);

  let artworksToLoad;

  if (artworksIds) {
    artworksIds.length - offset > 20 ?
      artworksToLoad = artworksIds.slice(offset, offset + 20)
      :
      artworksToLoad = artworksIds.slice(offset, artworksIds.length);
  }

  return (
    <>
      {artworksToLoad ?
        <ArtworksWithLoad changeOffset={setOffset} dataIds={artworksToLoad}/>
        : 'Nothing was found'
      }
    </>
  );
};

export default ArtworksCollectionPage;