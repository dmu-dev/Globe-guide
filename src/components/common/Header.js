import React from "react";
import {Link, NavLink} from "react-router-dom"

function Header() {

    return(
        <header id="header">
            <div className="row">
                <div className="logo">
                    <NavLink to=""><h1><span className="text-primary"><i className="fa fa-globe"></i> Globe </span>Guide</h1></NavLink>
                </div>
                <nav className="navigation">
                    <ul>
                        <li><NavLink to="">Home</NavLink></li>
                        <li><NavLink to="about">About</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;