import React from "react";
import { Link } from "react-router-dom";
import worldtravel from '../../assets/World-travel.jpeg'
import worldstudy from '../../assets/World-study3.jpg'

function AboutUs(){
 return(
    <>
         <section id="about">
             <div className="row">
                 <img className="img1" src={worldtravel} alt="worldtravel" />
                 <div className="about-text">
                     <p>Welcome to our website! We're dedicated to providing you with comprehensive information about countries from around the world. Whether you're a traveler, a student, or simply curious about different cultures, our goal is to make learning about countries an enriching experience.</p>
                     <p>Our platform offers a wealth of data about various countries, including details such as capitals, currencies, timezones, languages, and more. We've gathered this information to help you gain a deeper understanding of the diverse global landscape.</p>
                     <p>When you visit a country's profile on our website, you'll find key facts and figures that paint a vivid picture of its unique identity</p>
                 </div>
             </div>

             <div className="row">
                 <div className="about-text">
                     <p>By providing these details, we aim to create an educational platform that promotes cross-cultural understanding and celebrates the rich diversity of our world. </p>
                     <p>We believe that learning about different countries fosters appreciation and respect for global perspectives.</p>
                     <p>Start exploring our website to gain fascinating insights into countries, their capitals, currencies, timezones, languages, and much more. Whether you're a student conducting research, a traveler planning your next adventure, or simply a curious individual, we hope you find our content engaging and informative.</p>

                 </div>
                 <img className="img2" src={worldstudy} alt="" />
             </div>

             <div className="center-align">
                 <Link to="/">
                     <button className="btn btn-primary mt-3 mb-3">Start exploring!</button>
                 </Link>
             </div>
         </section>
    </>
 )
}

export default AboutUs;