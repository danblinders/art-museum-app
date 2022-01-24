import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMuseumData } from '../../hooks/useMuseumData';
import MuseumApi from '../../service/MuseumApi';
import ImageApi from '../../service/ImageApi';
import Spinner from '../spinner/Spinner';
import './DepartmentsList.scss';

const DepartmentsList = () => {
  const [departments, setDepartments] = useState(null);

  const navigate = useNavigate();

  const
    MuseumServiceApi = new MuseumApi(),
    ImageServiceApi = new ImageApi();

  const {
    isLoading,
    isError,
    dataToLoad,
    noFutureDataToLoad,
    increaseOffset
  } = useMuseumData(MuseumServiceApi.getDepartments);

  useEffect(() => {
    if (dataToLoad) {
      const dataWithImages = dataToLoad.map(async department => {
        const departmentImageURL = await ImageServiceApi.getPhoto(department.displayName);
  
        const newDepartment = {...department, departmentImageURL};
  
        return newDepartment;
      });
  
      Promise.all(dataWithImages)
        .then(departmentsList => setDepartments(departmentsList));
    }
  }, [dataToLoad]);

  const departmentsElems = departments?.map(department => {
    return (
      <div
        key={department.departmentId}
        className="departments__item"
        style={{background: `url(${department.departmentImageURL}) center center / cover no-repeat, hsla(0, 0%, 0%, 0.4)`}}
        onClick={() => navigate(`/departments/${department.departmentId}`)}>
        <div className="departments__item-name">{department.displayName}</div>
      </div>
    );
  });

  return (
    <section className="departments">
      <div className="container">
        <h2 className="subtitle departments__subtitle">Our departments</h2>
        {isLoading ?
          <Spinner/>
          :
          <div className="departments__group">
            {departmentsElems}
          </div>
        }
      </div>
    </section>
  );
};

export default DepartmentsList;