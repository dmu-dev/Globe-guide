import './App.css'
import { Route, Routes } from 'react-router-dom';
import Header from "./components/common/Header";
import CountryList from './components/pages/CountryList';
import Footer from './components/common/Footer';
import CountryDetails from './components/pages/CountryDetails';
import AboutUs from './components/pages/AboutUs'; 
import LiveSearch from './components/common/LiveSearch';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="" element={<CountryList></CountryList>}></Route>
        <Route path="/:name" element={<CountryDetails></CountryDetails>}></Route>
        <Route path="/about" element={<AboutUs></AboutUs>}></Route>
        <Route path="/search" element={<LiveSearch></LiveSearch>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
