import { useParams } from 'react-router-dom';
import { useArtworks } from '../../../hooks/useArtworks';
import MuseumApi from '../../../service/MuseumApi';
import ArtworksWithLoad from '../../artworksWithLoad/ArtworksWithLoad';
import Spinner from '../../spinner/Spinner';

const DepartmentPage = () => {
  const {departmentId} = useParams();

  const MuseumServiceApi = new MuseumApi();

  const {
    isLoading,
    artworksToLoad,
    noFutureArtworksToLoad,
    increaseOffset
  } = useArtworks(MuseumServiceApi.getDepartmentCollection, departmentId);

  return (
    <>
      <h1>Department {departmentId}</h1>
      <div className="container">
        <div className="department__collection">
          {
            isLoading ?
              <Spinner/>
              : artworksToLoad ?
                <ArtworksWithLoad
                  dataIds={artworksToLoad}
                  changeOffset={increaseOffset}
                  noFutureArtworksToLoad={noFutureArtworksToLoad}/>
                : 'SomeThing went wrong'
          }
        </div>
      </div>
    </>
  );
};

export default DepartmentPage;