import { useCallback } from 'react';
import { useMuseumData } from '../../hooks/useMuseumData';
import MuseumApi from '../../service/MuseumApi';
import ImageApi from '../../service/ImageApi';
import Spinner from '../spinner/Spinner';
import DataList from '../dataList/DataList';
import DepartmentCard from '../departmentCard/DepartmentCard';
import './DepartmentsSection.scss';

const DepartmentsSection = () => {
  const MuseumServiceApi = new MuseumApi();

  const addDepartmentsImages = useCallback(async (departmentsIds) => {
    const ImageServiceApi = new ImageApi();

    const departmentsPoromises = departmentsIds.map(async department => {
      return await ImageServiceApi.getPhoto(department.displayName)
        .then(departmentImageURL => {
          const departmentWithImage = {...department, departmentImageURL};
          return <DepartmentCard key={department.departmentId} departmentInfo={departmentWithImage}/>;
        });
    });

    return await Promise.all(departmentsPoromises);
  }, []);

  const {
    isLoading,
    isError,
    dataToLoad,
    noFutureDataToLoad : noFutureDepartmentsToLoad,
    increaseOffset
  } = useMuseumData(6, MuseumServiceApi.getDepartments);

  return (
    <section className="departments">
      <div className="container">
        <h2 className="subtitle departments__subtitle">Our departments</h2>
        {isLoading ?
          <Spinner/>
          :
          <DataList
            dataIds={dataToLoad}
            changeOffset={increaseOffset}
            noFutureDataToLoad={noFutureDepartmentsToLoad}
            transformation={[addDepartmentsImages]}
          />
        }
      </div>
    </section>
  );
};

export default DepartmentsSection;