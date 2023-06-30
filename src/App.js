import './App.css'
import Header from "./components/common/Header";
import CountryList from './components/pages/CountryList';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <CountryList></CountryList>
    </div>
  );
}

export default App;
