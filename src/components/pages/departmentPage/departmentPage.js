import { useEffect, useState } from 'react/cjs/react.development';
import { useParams } from 'react-router-dom';
import MuseumApi from '../../../service/MuseumApi';
import ArtworksList from '../../artworksList/ArtworksList';

const DepartmentPage = () => {
  const [departmentCollectionIds, setDepartmentCollectionIds] = useState(null);
  const [offset, setOffset] = useState(0);
  
  const {departmentId} = useParams();
  const MuseumServiceApi = new MuseumApi();

  useEffect(() => {
    MuseumServiceApi.getDepartmentCollection(departmentId)
      .then(result => setDepartmentCollectionIds(result));
  }, []);

  const displayedArtworksIds = departmentCollectionIds?.slice(offset, offset + 20);

  return (
    <>
      <h1>Department {departmentId}</h1>
      <div className="container">
        <div className="department__collection">
          {displayedArtworksIds ?
            <ArtworksList artworksIds={displayedArtworksIds} changeOffset={setOffset}/>
            : null
          }
        </div>
      </div>
    </>
  );
};

export default DepartmentPage;