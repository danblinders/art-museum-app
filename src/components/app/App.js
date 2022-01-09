import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MuseumApi from '../../service/MuseumApi';
import Header from '../header/Header';
import HomePage from '../pages/homePage/HomePage';
import './App.scss';

function App() {
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    const MuseumServiceApi = new MuseumApi();
    MuseumServiceApi.getDepartments().then(data => setDepartments(data.departments));
  }, []);

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path = "/" element = {<HomePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;