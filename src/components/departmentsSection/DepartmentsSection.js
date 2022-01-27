import { useCallback, useEffect, useState } from 'react';
import { useMuseumData } from '../../hooks/useMuseumData';
import MuseumApi from '../../service/MuseumApi';
import ImageApi from '../../service/ImageApi';
import Spinner from '../spinner/Spinner';
import DataList from '../dataList/DataList';
import DepartmentCard from '../departmentCard/DepartmentCard';
import './DepartmentsSection.scss';

const offsetStep = 6;

const DepartmentsSection = () => {
  const [departments, setDepartments] = useState(null);

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
    offset,
    dataToLoad,
    noFutureDataToLoad : noFutureDepartmentsToLoad,
    setMuseumDataState
  } = useMuseumData(offsetStep, MuseumServiceApi.getDepartments);

  useEffect(() => {
    if (dataToLoad) {
      const ImageServiceApi = new ImageApi();

      const departmentsPoromises = dataToLoad.map(async department => {
        return await ImageServiceApi.getPhoto(department.displayName)
          .then(departmentImageURL => {
            setMuseumDataState({isLoading: false});
            const departmentWithImage = {...department, departmentImageURL};
            return <DepartmentCard key={department.departmentId} departmentInfo={departmentWithImage}/>;
          });
      });
  
      Promise.all(departmentsPoromises)
        .then(departments => {
          setMuseumDataState({isLoading: false});
          setDepartments(currentDepartments =>
            currentDepartments ? [currentDepartments, ...departments] : departments);
        });
    }
  }, [dataToLoad]);

  return (
    <section className="departments">
      <div className="container">
        <h2 className="subtitle departments__subtitle">Our departments</h2>
        {
          isLoading && !departments ?
            <Spinner/>
            :
            <DataList
              offset={offset}
              offsetStep={offsetStep}
              loadingState={isLoading}
              loadMoreData={setMuseumDataState}
              data={departments}
              noFutureDataToLoad={noFutureDepartmentsToLoad}
            />
        }
      </div>
    </section>
  );
};

export default DepartmentsSection;