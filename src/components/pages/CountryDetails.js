import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import Wrapper from './../common/Wrapper';

function CountryDetails(){
    const { name }= useParams();
    const [ singleCountryDetail, setSingleCountryDetail] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{
      getCountryDetails();
    },[])

    const getCountryDetails = async()=>{
        try {
          const response = await fetch("https://restcountries.com/v3.1/name/"+name)
          const data = await response.json();
          console.log(data[0]?.name?.common);
          setSingleCountryDetail(data);
          setLoading(false);
        }
        catch(error){
        }
      }
    return(
        <>
            {!loading && <section id="showCase">
                <img src={singleCountryDetail[0]?.coatOfArms?.png} alt="" />
            </section>
            }

            {!loading && <secion id="country-details">
                <div className="column">
                    <div className="flag">
                        <img src={singleCountryDetail[0]?.flags?.png} alt="" />
                        <p>{singleCountryDetail[0].name?.common}</p>
                    </div>
                    <div className="details">
                        <div className="row card mb-3">
                            <div >
                                <p className="heading">Official Name</p>
                                <p>{singleCountryDetail[0]?.name?.official}</p>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="px-3 card">
                             <p className="heading">Capital</p>
                             <p>{singleCountryDetail[0]?.capital}</p>
                            </div>
                            <div className="px-3 card">
                                <p className="heading">Continents</p>
                            {singleCountryDetail[0]?.continents?.map((item) => {
                                return (<p>{item}  </p>)
                            })
                            }
                            </div>
                          
                        </div>
                        <div className="row card mb-3 ">
                            <div>
                                <p className="heading">Official Languages</p>
                                {Object.entries(singleCountryDetail[0]?.languages).map(([key, value]) => {
                                    return (<p>{value}</p>)
                                })}
                            </div>
                        </div>
                        <div className="row  mb-3">
                            <div className="card px-3">
                                <p className="heading">Currency</p>
                                {Object.entries(singleCountryDetail[0]?.currencies)?.map(([key, value]) => {
                                return (<p>{value.name}</p>)
                            })}
                            </div>
                            <div className="card px-3">
                                <p className="heading">Time Zone</p>
                                <p>{singleCountryDetail[0].timezones}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </secion>}
        </>
    )
}

export default CountryDetails;