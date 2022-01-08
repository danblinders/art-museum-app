import { useEffect, useState } from 'react';
import MuseumApi from '../../service/MuseumApi';
import './App.scss';

function App() {
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    const MuseumServiceApi = new MuseumApi();
    MuseumServiceApi.getDepartments().then(data => setDepartments(data.departments));
  }, []);

  return <h1>{departments.toString()}</h1>;
}

export default App;