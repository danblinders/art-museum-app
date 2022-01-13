import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../header/Header';
import HomePage from '../pages/homePage/HomePage';
import DepartmentPage from '../pages/departmentPage/DepartmentPage';
import ArtworkPage from '../pages/artworkPage/ArtworkPage';
import './App.scss';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/departments/:departmentId" element={<DepartmentPage/>}></Route>
        <Route path="/artworks/:artworkId" element={<ArtworkPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;