import { useParams } from 'react-router-dom';
import { useMuseumData } from '../../../hooks/useMuseumData';
import MuseumApi from '../../../service/MuseumApi';
import ArtworksWithLoad from '../../artworksWithLoad/ArtworksWithLoad';
import Spinner from '../../spinner/Spinner';

const DepartmentPage = () => {
  const {departmentId} = useParams();

  const MuseumServiceApi = new MuseumApi();

  const {
    isLoading,
    isError,
    dataToLoad,
    noFutureDataToLoad,
    increaseOffset
  } = useMuseumData(MuseumServiceApi.getDepartmentCollection, departmentId);

  return (
    <>
      <h1>Department {departmentId}</h1>
      <div className="container">
        <div className="department__collection">
          {
            isLoading ?
              <Spinner/>
              : dataToLoad ?
                <ArtworksWithLoad
                  dataIds={dataToLoad}
                  changeOffset={increaseOffset}
                  noFutureArtworksToLoad={noFutureDataToLoad}/>
                : 'SomeThing went wrong'
          }
        </div>
      </div>
    </>
  );
};

export default DepartmentPage;