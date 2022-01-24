import { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import MuseumApi from '../../service/MuseumApi';
import ImageApi from '../../service/ImageApi';
import Spinner from '../spinner/Spinner';
import './DepartmentsList.scss';

const DepartmentsList = () => {
  const [state, setState] = useReducer(
    (oldState, newState) => ({...oldState, ...newState}),
    {isLoading: true, departments: null}
  );

  const navigate = useNavigate();

  useEffect(() => {
    const
      MuseumServiceApi = new MuseumApi(),
      ImageServiceApi = new ImageApi();

    MuseumServiceApi.getDepartments()
      .then(result => {
        const resultWithImages = result.map(async department => {
          const departmentImageURL = await ImageServiceApi.getPhoto(department.displayName);
  
          const newDepartment = {...department, departmentImageURL};
  
          return newDepartment;
        });

        return Promise.all(resultWithImages);
      })
      .then(departmentsList => {
        setState({isLoading: false, departments: departmentsList});
      })
      .catch(e => {
        setState({isLoading: false});
        console.log(e);
      });
  }, []);

  const departmentsElems = state.departments?.map(department => {
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
        {state.isLoading ?
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