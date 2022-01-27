import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMuseumData } from '../../../hooks/useMuseumData';
import MuseumApi from '../../../service/MuseumApi';
import DataList from '../../dataList/DataList';
import ArtworkCard from '../../artworkCard/ArtworkCard';
import Spinner from '../../spinner/Spinner';
import fallbackThumbnail from '../../../img/no-image.png';

const offsetStep = 20;

const SearchArtworksPage = () => {
  const [artworks, setArtworks] = useState(null);

  const MuseumServiceApi = new MuseumApi();

  const [searchParams] = useSearchParams();
  const {q: term, ...filters} = Object.fromEntries([...searchParams]);

  const {
    isLoading,
    isError,
    dataToLoad,
    offset,
    noFutureDataToLoad : noFutureArtworksToLoad,
    setMuseumDataState
  } = useMuseumData(offsetStep, MuseumServiceApi.getArtworksWithFilters, term, filters);

  useEffect(() => {
    if (dataToLoad) {
      const artworksPoromises = dataToLoad.map(async artworkId => {
        return await MuseumServiceApi.getArtwork(artworkId)
          .then(artwork => {
            if (artwork.primaryImage.length === 0) {
              artwork.primaryImage = fallbackThumbnail;
            }
            return <ArtworkCard key={artwork.objectID} artworkData={artwork}/>;
          });
      });
  
      Promise.all(artworksPoromises)
        .then(artworks => {
          setMuseumDataState({isLoading: false});
          setArtworks(currentArtworks => currentArtworks ? [...currentArtworks, ...artworks] : artworks);
        });
    }
  }, [dataToLoad]);

  return (
    <>
      {
        isLoading && !artworks ?
          <Spinner/>
          :
          <DataList
            offset={offset}
            offsetStep={offsetStep}
            loadingState={isLoading}
            loadMoreData={setMuseumDataState}
            data={artworks}
            noFutureDataToLoad={noFutureArtworksToLoad}
          />
      }
    </>
  );
};

export default SearchArtworksPage;