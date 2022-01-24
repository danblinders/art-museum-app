import { useSearchParams } from 'react-router-dom';
import { useArtworks } from '../../../hooks/useArtworks';
import MuseumApi from '../../../service/MuseumApi';
import ArtworksWithLoad from '../../artworksWithLoad/ArtworksWithLoad';
import Spinner from '../../spinner/Spinner';

const SearchArtworksPage = () => {
  const MuseumServiceApi = new MuseumApi();

  const [searchParams] = useSearchParams();
  const {q: term, ...filters} = Object.fromEntries([...searchParams]);

  const {
    isLoading,
    artworksToLoad,
    noFutureArtworksToLoad,
    increaseOffset
  } = useArtworks(MuseumServiceApi.getArtworksWithFilters, term, filters);

  console.log(noFutureArtworksToLoad);

  return (
    <>
      {
        isLoading ?
          <Spinner/>
          : artworksToLoad ?
            <ArtworksWithLoad
              dataIds={artworksToLoad}
              changeOffset={increaseOffset}
              noFutureArtworksToLoad={noFutureArtworksToLoad}/>
            : 'Nothing was found'
      }
    </>
  );
};

export default SearchArtworksPage;