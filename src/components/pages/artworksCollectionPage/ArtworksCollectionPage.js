import { useEffect, useState } from 'react/cjs/react.development';
import { useLocation } from 'react-router-dom';
import MuseumApi from '../../../service/MuseumApi';
import ArtworksList from '../../artworksList/ArtworksList';

const ArtworksCollectionPage = () => {
  const [artworksIds, setArtworksIds] = useState(null);
  const [offset, setOffset] = useState(0);

  const searchParams = useLocation().search;

  const MuseumServiceApi = new MuseumApi();

  useEffect(() => {
    MuseumServiceApi.getArtworksWithFilters(searchParams)
      .then(result => setArtworksIds(result));
  }, []);

  let artworksToLoad;

  if (artworksIds) {
    artworksToLoad = artworksIds.length - offset > 20 ?
      artworksIds.slice(offset, offset + 20)
      :
      artworksIds.slice(offset, artworksIds.length);
  }

  return (
    <>
      {artworksToLoad ?
        <ArtworksList artworksIds={artworksToLoad} changeOffset={setOffset}/> 
        : 'Nothing was found'
      }
    </>
  );
};

export default ArtworksCollectionPage;