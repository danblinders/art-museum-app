import { useParams } from 'react-router-dom';
import { useArtworks } from '../../../hooks/useArtworks';
import MuseumApi from '../../../service/MuseumApi';
import ArtworksWithLoad from '../../artworksWithLoad/ArtworksWithLoad';

const DepartmentPage = () => {
  const {departmentId} = useParams();

  const MuseumServiceApi = new MuseumApi();

  const {artworksToLoad, setOffset} = useArtworks(MuseumServiceApi.getDepartmentCollection, departmentId);

  return (
    <>
      <h1>Department {departmentId}</h1>
      <div className="container">
        <div className="department__collection">
          {artworksToLoad ?
            <ArtworksWithLoad dataIds={artworksToLoad} changeOffset={setOffset}/>
            : null
          }
        </div>
      </div>
    </>
  );
};

export default DepartmentPage;