import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useMuseumData } from '../../../hooks/useMuseumData';
import MuseumApi from '../../../service/MuseumApi';
import DataList from '../../dataList/DataList';
import ArtworkCard from '../../artworkCard/ArtworkCard';
import Spinner from '../../spinner/Spinner';
import fallbackThumbnail from '../../../img/no-image.png';

const DepartmentPage = () => {
  const {departmentId} = useParams();

  const MuseumServiceApi = new MuseumApi();

  const {
    isLoading,
    isError,
    dataToLoad,
    noFutureDataToLoad : noFutureArtworksToLoad,
    increaseOffset
  } = useMuseumData(20, MuseumServiceApi.getDepartmentCollection, departmentId);

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
      <h1>Department {departmentId}</h1>
      <div className="container">
        <div className="department__collection">
          {
            isLoading ?
              <Spinner/>
              :
              dataToLoad ?
                <DataList
                  dataIds={dataToLoad}
                  changeOffset={increaseOffset}
                  noFutureDataToLoad={noFutureArtworksToLoad}
                  transformation={[modifyArtworksObjects]}
                />
                :
                'Nothing was found'
          }
        </div>
      </div>
    </>
  );
};

export default DepartmentPage;