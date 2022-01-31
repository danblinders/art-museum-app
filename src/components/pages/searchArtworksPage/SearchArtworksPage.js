import { useSearchParams, useLocation } from 'react-router-dom';
import useMuseumData from '../../../hooks/useMuseumData';
import usePersistedData from '../../../hooks/usePersistedData';
import useEffectAfterMount from '../../../hooks/useEffectAfterMount';
import MuseumApi from '../../../service/MuseumApi';
import DataList from '../../dataList/DataList';
import ArtworkCard from '../../artworkCard/ArtworkCard';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import fallbackThumbnail from '../../../img/no-image.png';

const offsetStep = 20;

const SearchArtworksPage = () => {
  const [artworks, setArtworks] = usePersistedData( `search_${useLocation().key}`);

  const MuseumServiceApi = new MuseumApi();

  const [searchParams] = useSearchParams();
  const {q: term, ...filters} = Object.fromEntries([...searchParams]);

  const {
    isLoading,
    errorRes,
    dataToLoad,
    offset,
    noFutureDataToLoad : noFutureArtworksToLoad,
    setMuseumDataState
  } = useMuseumData(offsetStep, MuseumServiceApi.getArtworksWithFilters, term, filters);

  const modifyArtworksObjects = () => {
    if (dataToLoad) {
      const artworksPoromises = dataToLoad.map(async artworkId => {
        return await MuseumServiceApi.getArtwork(artworkId)
          .then(artwork => {
            if (artwork.primaryImage.length === 0) {
              artwork.primaryImage = fallbackThumbnail;
            }
            return artwork;
          });
      });
  
      Promise.all(artworksPoromises)
        .then(artworks => {
          setArtworks(currentArtworks => {
            const newArtworksList = currentArtworks ? [...currentArtworks, ...artworks] : artworks;
            return newArtworksList.filter((item, id, arr) => {
              return arr.findIndex(elem => elem.objectID === item.objectID) === id;
            });
          });
          setMuseumDataState({isLoading: false});
        });
    }
  };

  useEffectAfterMount(modifyArtworksObjects, [dataToLoad]);

  const artworksElems = artworks?.map(artwork =>
    <ArtworkCard key={artwork.objectID} artworkData={artwork}/>
  );

  return (
    <>
      {
        errorRes.status ?
          <ErrorMessage text={errorRes.message}/>
          :
          isLoading && !artworks ?
            <Spinner/>
            :
            <DataList
              offset={offset}
              offsetStep={offsetStep}
              loadingState={isLoading}
              loadMoreData={setMuseumDataState}
              data={artworksElems}
              noFutureDataToLoad={noFutureArtworksToLoad}
            />
      }
    </>
  );
};

export default SearchArtworksPage;