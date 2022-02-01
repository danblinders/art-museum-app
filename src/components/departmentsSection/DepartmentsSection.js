import useMuseumData from '../../hooks/useMuseumData';
import usePersistedData from '../../hooks/usePersistedData';
import useEffectAfterMount from '../../hooks/useEffectAfterMount';
import MuseumApi from '../../service/MuseumApi';
import ImageApi from '../../service/ImageApi';
import Spinner from '../spinner/Spinner';
import DataList from '../dataList/DataList';
import DepartmentCard from '../departmentCard/DepartmentCard';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './DepartmentsSection.scss';

const offsetStep = 4;

const DepartmentsSection = () => {
  const [departments, setDepartments] = usePersistedData('departments');

  const MuseumServiceApi = new MuseumApi();

  const {
    isLoading,
    errorRes,
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
          setDepartments(currentDepartments => {
            const newDepartmentsList = currentDepartments ?
              [...currentDepartments, ...departments]
              :
              departments;
            return newDepartmentsList.filter((item, id, arr) => {
              return arr.findIndex(elem => elem.departmentId === item.departmentId) === id;
            });
          });
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
        <div className="departments__content">
          <h2 className="subtitle departments__subtitle">Our departments</h2>
          <div className="departments__list">
            {
              errorRes.status ?
                <ErrorMessage text={errorRes.message}/>
                :
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
        </div>
      </div>
    </section>
  );
};

export default DepartmentsSection;