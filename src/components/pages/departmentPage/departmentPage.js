import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMuseumData } from '../../../hooks/useMuseumData';
import MuseumApi from '../../../service/MuseumApi';
import DataList from '../../dataList/DataList';
import ArtworkCard from '../../artworkCard/ArtworkCard';
import Spinner from '../../spinner/Spinner';
import fallbackThumbnail from '../../../img/no-image.png';

const offsetStep = 20;

const DepartmentPage = () => {
  const [departmentCollection, setDepartmentCollection] = useState(null);

  const {departmentId} = useParams();

  const MuseumServiceApi = new MuseumApi();

  const {
    isLoading,
    isError,
    dataToLoad,
    offset,
    noFutureDataToLoad : noFutureArtworksToLoad,
    setMuseumDataState
  } = useMuseumData(offsetStep, MuseumServiceApi.getDepartmentCollection, departmentId);

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
          setDepartmentCollection(currentCollection =>
            currentCollection ? [...currentCollection, ...artworks] : artworks);
        });
    }
  }, [dataToLoad]);

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
                data={departmentCollection}
                noFutureDataToLoad={noFutureArtworksToLoad}
              />
          }
        </div>
      </div>
    </>
  );
};

export default DepartmentPage;