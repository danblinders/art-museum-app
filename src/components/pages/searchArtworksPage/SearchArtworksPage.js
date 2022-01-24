import { useSearchParams } from 'react-router-dom';
import { useMuseumData } from '../../../hooks/useMuseumData';
import MuseumApi from '../../../service/MuseumApi';
import ArtworksWithLoad from '../../artworksWithLoad/ArtworksWithLoad';
import Spinner from '../../spinner/Spinner';

const SearchArtworksPage = () => {
  const MuseumServiceApi = new MuseumApi();

  const [searchParams] = useSearchParams();
  const {q: term, ...filters} = Object.fromEntries([...searchParams]);

  const {
    isLoading,
    isError,
    dataToLoad,
    noFutureDataToLoad,
    increaseOffset
  } = useMuseumData(MuseumServiceApi.getArtworksWithFilters, term, filters);

  return (
    <>
      {
        isLoading ?
          <Spinner/>
          :dataToLoad ?
            <ArtworksWithLoad
              dataIds={dataToLoad}
              changeOffset={increaseOffset}
              noFutureArtworksToLoad={noFutureDataToLoad}/>
            : 'Nothing was found'
      }
    </>
  );
};

export default SearchArtworksPage;