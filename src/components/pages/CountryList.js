import React, { useEffect, useState } from "react";
import Wrapper from "../common/Wrapper";

function CountryList() {

  const [allCountryDetails, setAllCountryDetails]= useState([]);
  const [displayedCountries, setDisplayedCountries]= useState([]); 
  const [displayContriesLength, setDisplayedCountriesLength] = useState(0);

  useEffect(()=>{
    getCountryDetails();
  },[])

  const getCountryDetails = async()=>{
    try {
      const response = await fetch("https://restcountries.com/v3.1/all")
      const data = await response.json();
      console.log(data);
      setAllCountryDetails(data);
      setDisplayedCountries(data.splice(0,8));
    }
    catch(error){
    }
  }

  const loadMoreCountries = ()=>{
    if((allCountryDetails.length-displayedCountries.length)<8){
      console.log("if block")
      let remainingCountries= allCountryDetails.length-displayedCountries.length;
      setDisplayedCountries(...displayedCountries, ...allCountryDetails.splice(displayedCountries?.length,remainingCountries));
    }
    else{
      console.log("else block")
      setDisplayedCountries(displayedCountries, allCountryDetails.splice(displayedCountries?.length,8));
      console.log(displayedCountries);
    }
    console.log(displayedCountries);
  }

  return(
    <>
      <section id="search">
        <div className="search-box">
            <h4>What are you looking for?</h4>
            <h2>We Provide Global details</h2>
            <input type="text" placeholder="Search by Country Name"/>
        </div>
      </section>

      <section id="country-list">
        <h1>Countries</h1>
        <div className="grid">
          <div className="row">
            {/* {displayedCountries.map((item) => {
              return(
              <div className="image-item">
                <img src={item?.flags?.png} alt="" />
                <p>{item?.name?.common}</p>
              </div>
              )
            })} */}
          </div>
        </div>
        <div className="center-align mb-3">
         <button className="btn" onClick={loadMoreCountries}>Load More</button>
        </div>
      </section>
    </>
  )
}

export default CountryList;