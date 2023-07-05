import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../common/Wrapper";

function CountryList() {

  const [allCountryDetails, setAllCountryDetails]= useState([]);
  const [displayedCountries, setDisplayedCountries]= useState([]); 
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [searchValue, setsearchValue]= useState('');
  const [focusedIndex, setFocusedIndex]= useState(-1);
  const resultContainer = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    getCountryDetails();
  },[])

  useEffect(()=>{
    if(!resultContainer.current) return;
    resultContainer.current.scrollIntoView({
      block:"center"
    })
  },[focusedIndex])

  const getCountryDetails = async()=>{
    try {
      const response = await fetch("https://restcountries.com/v3.1/all")
      const data = await response.json();
      console.log(data);
      setAllCountryDetails(data);
      setDisplayedCountries(data.slice(0,8));
    }
    catch(error){
    }
  }

  const loadMoreCountries = ()=>{
    if((allCountryDetails.length-displayedCountries.length)<8){
      let remainingCountries= allCountryDetails.length-displayedCountries.length;
      let newDisplayArray=[...displayedCountries, ...allCountryDetails.slice(displayedCountries?.length,displayedCountries?.length+remainingCountries)]
      setDisplayedCountries(newDisplayArray); 
      setShowLoadMore(false);
    }
    else{
      let newDisplayArray=[...displayedCountries, ...allCountryDetails.slice(displayedCountries?.length,displayedCountries?.length+8)]
      setDisplayedCountries(newDisplayArray);
    }
  }

  const onChange = (event)=>{
    setsearchValue(event.target.value);
    if(event.target.value==""){
      setDisplayedCountries(allCountryDetails.slice(0,8));
    }

  }

  const onSearch=(countryName)=>{
    setsearchValue(countryName);
    console.log("wat seract",countryName);
    allCountryDetails.forEach(element => {
      if(element.name.common==countryName){
        let displayArray=[element]
        console.log(element)
        setDisplayedCountries(displayArray)

      }
    });
  }

  const handleKeyDown=(e)=>{
    console.log("inside handle key down")
    const {key}=e;
    let nextIndexCount=0;
    if(key==="ArrowDown"){
      nextIndexCount=(focusedIndex+1)% allCountryDetails.length;
    }
    if(key==="ArrowUp"){
      nextIndexCount=(focusedIndex+allCountryDetails.length-1)% allCountryDetails.length;
    }
    if(key==="Escape"){}
    if(key==="Enter"){}
    setFocusedIndex(nextIndexCount)
  }

  return(
    <>
      <section id="search">
        <div className="search-box">
            <h4>What are you looking for?</h4>
            <h2>We Provide Global details</h2>
            {/* <div tabIndex={1} onKeyDown={handleKeyDown}> */}
            <input type="text" value={searchValue} onChange={onChange} placeholder="Search by Country Name" />
            {/* <span><i className="fas fa-magnifying-glass"></i></span> */}
            <div className="dropdown">
              {allCountryDetails.filter((item)=>{
                const searchtext = searchValue.toLowerCase();
                const countryName = item.name.common.toLowerCase();
                return  searchValue.length>=2 && countryName.includes(searchtext) && countryName!== searchtext
              })
              .map((item,index)=>{
                return  ( <div key={index} ref={(index===focusedIndex)? resultContainer:null} onClick={()=>onSearch(item.name.common)}>{item.name.common}</div>)
              })}
            </div>
            {/* </div> */}
        </div>
      </section>

      <section id="country-list">
        <h1>Countries</h1>
        <div className="grid">
          <div className="row">
            {displayedCountries.map((item) => {
              return(
              <div className="image-item">
                <Link to={item?.name?.common}>
                  <img src={item?.flags?.png} alt="" />
                </Link>
                <p>{item?.name?.common}</p>
              </div>
              )
            })}
          </div>
        </div>
        {showLoadMore && <div className="center-align mb-3">
         <button className="btn" onClick={loadMoreCountries}>Load More</button>
        </div>}
      </section>
    </>
  )
}

export default CountryList;