import { useEffect } from 'react';
import { useMuseumData } from '../../hooks/useMuseumData';
import usePersistedData from '../../hooks/usePersistedData';
import useEffectAfterMount from '../../hooks/useEffectAfterMount';
import MuseumApi from '../../service/MuseumApi';
import ImageApi from '../../service/ImageApi';
import Spinner from '../spinner/Spinner';
import DataList from '../dataList/DataList';
import DepartmentCard from '../departmentCard/DepartmentCard';
import './DepartmentsSection.scss';

const offsetStep = 6;

const DepartmentsSection = () => {
  const [departments, setDepartments] = usePersistedData('departments');

  const MuseumServiceApi = new MuseumApi();

  const {
    isLoading,
    isError,
    offset,
    dataToLoad,
    noFutureDataToLoad : noFutureDepartmentsToLoad,
    setMuseumDataState
  } = useMuseumData(offsetStep, MuseumServiceApi.getDepartments);

  const addDepartmentsImages = () => {
    if (dataToLoad) {
      const ImageServiceApi = new ImageApi();

      const departmentsPoromises = dataToLoad.map(async department => {
        return await ImageServiceApi.getPhoto(department.displayName)
          .then(departmentImageURL => ({...department, departmentImageURL}) );
      });
  
      Promise.all(departmentsPoromises)
        .then(departments => {
          setDepartments(currentDepartments =>
            currentDepartments ? [...currentDepartments, ...departments] : departments
          );
          setMuseumDataState({isLoading: false});
        });
    }
  };

  useEffectAfterMount(addDepartmentsImages, [dataToLoad]);

  const departmentsElems = departments?.map(department =>
    <DepartmentCard key={department.departmentId} departmentInfo={department}/>
  );

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
              data={departmentsElems}
              noFutureDataToLoad={noFutureDepartmentsToLoad}
            />
        }
      </div>
    </section>
  );
};

export default DepartmentsSection;