import { useEffect, useState } from 'react';
import MuseumApi from '../../service/MuseumApi';
import ImageApi from '../../service/ImageApi';
import './DepartmentsList.scss';

const DepartmentsList = () => {
  const [departments, setDepartments] = useState(null);

  useEffect(() => {
    const fetchDepartmentData = async () => {
      const
        MuseumServiceApi = new MuseumApi(),
        ImageServiceApi = new ImageApi();

      const departmentsList = (await MuseumServiceApi.getDepartments()).departments;

      for (let [index, department] of departmentsList.entries()) {
        const departmentImageURL = (await ImageServiceApi.getPhoto(department.displayName)).results[0].urls.regular;
        departmentsList[index] = {...department, departmentImageURL};
      }

      return departmentsList;
    };

    fetchDepartmentData().then(result => setDepartments(result));
  }, []);

  const departmentsElems = departments?.map(department => {
    return (
      <div
        key={department.departmentId}
        className="departments__item"
        style={{background: `url(${department.departmentImageURL}) center center / cover no-repeat, hsla(0, 0%, 0%, 0.4)`}}>
        <div className="departments__item-name">{department.displayName}</div>
      </div>
    );
  });

  return (
    <section className="departments">
      <h2 className="departments__title">Our departments</h2>
      <div className="departments__group">
        {departmentsElems}
      </div>
    </section>
  );
};

export default DepartmentsList;

console.log('start');
const promise = new Promise(resolve => {
  setTimeout(resolve, 1000);
});
console.log(promise);
console.log('end');