import { useSearchParams } from 'react-router-dom';
import { useArtworks } from '../../../hooks/useArtworks';
import MuseumApi from '../../../service/MuseumApi';
import ArtworksWithLoad from '../../artworksWithLoad/ArtworksWithLoad';

const SearchArtworksPage = () => {
  const MuseumServiceApi = new MuseumApi();

  const [searchParams] = useSearchParams();
  const {q: term, ...filters} = Object.fromEntries([...searchParams]);

  const {artworksToLoad, setOffset} = useArtworks(MuseumServiceApi.getArtworksWithFilters, term, filters);

  return (
    <>
      {artworksToLoad ?
        <ArtworksWithLoad dataIds={artworksToLoad} changeOffset={setOffset}/>
        : 'Nothing was found'
      }
    </>
  );
};

export default SearchArtworksPage;