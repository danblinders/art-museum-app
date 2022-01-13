import { useEffect, useState } from 'react/cjs/react.development';
import { useParams } from 'react-router-dom';
import MuseumApi from '../../../service/MuseumApi';

const DepartmentPage = () => {
  const {departmentId} = useParams();
  const MuseumServiceApi = new MuseumApi();

  const [departmentCollection, setDepartmentCollection] = useState(null);

  useEffect(() => {
    MuseumServiceApi.getDepartmentCollection(departmentId).then(result => setDepartmentCollection(result[0]));
  }, []);

  return (
    <>
      <h1>Department {departmentId}</h1>
      <div>{departmentCollection}</div>
    </>
  );
};

export default DepartmentPage;