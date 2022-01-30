import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMuseumData } from '../../../hooks/useMuseumData';
import usePersistedData from '../../../hooks/usePersistedData';
import useEffectAfterMount from '../../../hooks/useEffectAfterMount';
import MuseumApi from '../../../service/MuseumApi';
import DataList from '../../dataList/DataList';
import ArtworkCard from '../../artworkCard/ArtworkCard';
import Spinner from '../../spinner/Spinner';
import fallbackThumbnail from '../../../img/no-image.png';

const offsetStep = 20;

const DepartmentPage = () => {
  const {departmentId} = useParams();

  const [departmentCollection, setDepartmentCollection] = usePersistedData(`department_${departmentId}`);

  const MuseumServiceApi = new MuseumApi();

  const {
    isLoading,
    isError,
    dataToLoad,
    offset,
    noFutureDataToLoad : noFutureArtworksToLoad,
    setMuseumDataState
  } = useMuseumData(offsetStep, MuseumServiceApi.getDepartmentCollection, departmentId);

  const modifyDepartmentCollectionObjects = () => {
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
          setDepartmentCollection(currentCollection =>
            currentCollection ? [...currentCollection, ...artworks] : artworks
          );
          setMuseumDataState({isLoading: false});
        });
    }
  };

  useEffectAfterMount(modifyDepartmentCollectionObjects, [dataToLoad]);

  const departmentCollectionElems = departmentCollection?.map(artwork =>
    <ArtworkCard key={artwork.objectID} artworkData={artwork}/>
  );

  return (
    <>
      <h1>Department {departmentId}</h1>
      <div className="container">
        <div className="department__collection">
          {
            isLoading && !departmentCollection ?
              <Spinner/>
              :
              <DataList
                offset={offset}
                offsetStep={offsetStep}
                loadingState={isLoading}
                loadMoreData={setMuseumDataState}
                data={departmentCollectionElems}
                noFutureDataToLoad={noFutureArtworksToLoad}
              />
          }
        </div>
      </div>
    </>
  );
};

export default DepartmentPage;