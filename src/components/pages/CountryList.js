import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../common/Wrapper";
import LiveSearch from "../common/LiveSearch";

function CountryList() {

  const [allCountryDetails, setAllCountryDetails]= useState([]);
  const [displayedCountries, setDisplayedCountries]= useState([]); 
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [loading, setLoading]= useState(true);
  const [searchValue, setsearchValue]= useState('');
  const [results, setResults] = useState([]);

  useEffect(()=>{
    getCountryDetails();
    console.log("in use effect")
  },[])

  const getCountryDetails = async()=>{
    console.log("in get all countries block")
    try {
      console.log("in try of get all countries block")
      const response = await fetch("https://restcountries.com/v3.1/all")
      console.log("response",response)
     const data = await response.json();
      console.log("data",data);
      setAllCountryDetails(data);
      setDisplayedCountries(data.slice(0,8));
      setLoading(false);
      console.log("loading", loading)
      console.log("in try of get all countries block")
    }
    catch(error){
      console.log("in catch of get all countries block")
    }
  }

  const loadMoreCountries = ()=>{
    if((allCountryDetails.length-displayedCountries.length)<8){
      console.log("length", (allCountryDetails.length-displayedCountries.length))
      let remainingCountries= allCountryDetails.length-displayedCountries.length;
      let newDisplayArray=[...displayedCountries, ...allCountryDetails.slice(displayedCountries?.length,displayedCountries?.length+remainingCountries)]
      setDisplayedCountries(newDisplayArray); 
      setShowLoadMore(false);
      console.log("shw load more", showLoadMore)
    }
    else{
      let newDisplayArray=[...displayedCountries, ...allCountryDetails.slice(displayedCountries?.length,displayedCountries?.length+8)]
      setDisplayedCountries(newDisplayArray);
    }
  }

  const onSearch=(countryName)=>{
    setsearchValue(countryName);
    allCountryDetails.forEach(element => {
      if(element.name.common==countryName){
        let displayArray=[element]
        setDisplayedCountries(displayArray)
        setShowLoadMore(false);
      }
    });
  }

  const handleChange = (e) => {
    const { target } = e;
    if (!target.value.trim()) return setResults([]);
    const filteredValue = allCountryDetails.filter((profile) =>
      profile.name.common.toLowerCase().includes(e.target.value) && e.target.value.length>=2
    );
    setResults(filteredValue);
    setShowLoadMore(true)
  };

  return(
    <>
      <section id="search" aria-label="Search Countries">
        <div className="search-box">
            <h2 data-testid="main-heading">What are you looking for?</h2>
            <h3 data-testid="sub-heading">We Provide Global details</h3>
            {!loading && <LiveSearch results={results} searchItems={allCountryDetails} onChange={handleChange} onSelect={(item)=>onSearch(item.name.common)}></LiveSearch>}
        </div>
      </section>

      <section id="country-list" aria-label="Country list">
        <h1>Countries</h1>
        <div className="grid">
          {!loading && <div className="row">
            {displayedCountries.map((item, index) => {
              return (

                <div className="image-item" key={index}>
                  <Link to={item?.name?.common} aria-label={'Link to country ' + item.name.common}>
                    <img src={item?.flags?.png} alt="" />
                  </Link>
                  <p>{item?.name?.common}</p>
                  <p></p>
                </div>
              )
            })}
          </div>}
        </div>
        {showLoadMore && <div className="center-align mb-3">
          <button className="btn" onClick={loadMoreCountries}>Load More</button>
        </div>}
      </section>
    </>
  )
}

export default CountryList;