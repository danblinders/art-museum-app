import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMuseumData } from '../../../hooks/useMuseumData';
import MuseumApi from '../../../service/MuseumApi';
import DataList from '../../dataList/DataList';
import ArtworkCard from '../../artworkCard/ArtworkCard';
import Spinner from '../../spinner/Spinner';
import fallbackThumbnail from '../../../img/no-image.png';

const SearchArtworksPage = () => {
  const MuseumServiceApi = new MuseumApi();

  const [searchParams] = useSearchParams();
  const {q: term, ...filters} = Object.fromEntries([...searchParams]);

  const {
    isLoading,
    isError,
    dataToLoad,
    noFutureDataToLoad : noFutureArtworksToLoad,
    increaseOffset
  } = useMuseumData(20, MuseumServiceApi.getArtworksWithFilters, term, filters);

  const modifyArtworksObjects = useCallback(async (artworksIds) => {
    const artworksPoromises = artworksIds.map(async artworkId => {
      return await MuseumServiceApi.getArtwork(artworkId)
        .then(artwork => {
          if (artwork.primaryImage.length === 0) {
            artwork.primaryImage = fallbackThumbnail;
          }
          return <ArtworkCard key={artwork.objectID} artworkData={artwork}/>;
        });
    });

    return await Promise.all(artworksPoromises);
  }, []);
  
  return (
    <>
      {
        isLoading ?
          <Spinner/>
          : dataToLoad ?
            <DataList
              dataIds={dataToLoad}
              changeOffset={increaseOffset}
              noFutureDataToLoad={noFutureArtworksToLoad}
              transformation={[modifyArtworksObjects]}
            />
            :
            'Nothing was found'
      }
    </>
  );
};

export default SearchArtworksPage;