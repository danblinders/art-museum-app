import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MuseumApi from '../../service/MuseumApi';
import ImageApi from '../../service/ImageApi';
import './DepartmentsList.scss';

const DepartmentsList = () => {
  const [departments, setDepartments] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartmentData = async () => {
      const
        MuseumServiceApi = new MuseumApi(),
        ImageServiceApi = new ImageApi();

      let departmentsList = await MuseumServiceApi.getDepartments();
      
      const modifieDdepartmentsListPromises = departmentsList.map(async department => {
        const departmentImageURL = await ImageServiceApi.getPhoto(department.displayName);

        const newDepartment = {...department, departmentImageURL};

        return newDepartment;
      });

      departmentsList = await Promise.all(modifieDdepartmentsListPromises);

      return departmentsList;
    };

    fetchDepartmentData().then(result => setDepartments(result));
  }, []);

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
        <div className="departments__group">
          {departmentsElems}
        </div>
      </div>
    </section>
  );
};

export default DepartmentsList;