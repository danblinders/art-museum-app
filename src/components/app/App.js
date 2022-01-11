import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../header/Header';
import HomePage from '../pages/homePage/HomePage';
import './App.scss';

function App() {
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