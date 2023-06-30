import React from "react";
import {Link, NavLink} from "react-router-dom"

function Header() {

    return(
        <header id="header">
            <div className="row">
                <div className="logo">
                    <h1><span className="text-primary"><i className="fa fa-globe"></i> Globe </span>Guide</h1>
                </div>
                <nav className="navigation">
                    <ul>
                        <li><NavLink >Home</NavLink></li>
                        <li><NavLink >About</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;